import test from 'node:test';
import assert from 'node:assert/strict';
import { projectGamification } from '../packages/campaign/a1/gamification-projection.mjs';

const journal={campaignId:'c1',definitionVersion:'1.5',events:[
 {id:'e1',cursor:1,type:'MISSION_COMPLETED',targetId:'a',nodeId:'n1'},
 {id:'e2',cursor:2,type:'CHECKPOINT',targetId:'a',nodeId:'n1'},
]};
const policy={version:'1',xpByEvent:{MISSION_COMPLETED:10,CHECKPOINT:25},badges:[{id:'first-checkpoint',eventType:'CHECKPOINT'}]};

test('projects deterministic immutable XP and badges from journal plus policy',()=>{
 const a=projectGamification({journal,rewardPolicy:policy});
 const b=projectGamification({journal:structuredClone(journal),rewardPolicy:structuredClone(policy)});
 assert.deepEqual(a,b); assert.equal(a.xp,35); assert.deepEqual(a.badges,['first-checkpoint']);
 assert.equal(Object.isFrozen(a),true); assert.equal(Object.isFrozen(a.badges),true);
});

test('presentation counters do not mutate authoritative journal',()=>{
 const before=structuredClone(journal); const out=projectGamification({journal,rewardPolicy:policy});
 out; assert.deepEqual(journal,before);
});

test('rejects policies claiming gate unlock authority',()=>{
 assert.throws(()=>projectGamification({journal,rewardPolicy:{...policy,gateUnlocks:['g1']}}),/authority|gate/i);
});

test('rejects policies claiming evidence mutation authority',()=>{
 assert.throws(()=>projectGamification({journal,rewardPolicy:{...policy,mutateEvidence:true}}),/authority|evidence/i);
});
test('rejects reward rules that inject journal events or evidence',()=>{
 assert.throws(()=>projectGamification({journal,rewardPolicy:{...policy,appendEvents:[{type:'ACCEPTED_EVIDENCE'}]}}),/authority|journal|evidence/i);
});

test('reward-policy changes affect presentation only',()=>{
 const low=projectGamification({journal,rewardPolicy:{...policy,xpByEvent:{MISSION_COMPLETED:1,CHECKPOINT:1}}});
 const high=projectGamification({journal,rewardPolicy:{...policy,xpByEvent:{MISSION_COMPLETED:1000,CHECKPOINT:5000}}});
 assert.notEqual(low.xp,high.xp);
 assert.deepEqual(journal.events.map(e=>[e.id,e.type]),[['e1','MISSION_COMPLETED'],['e2','CHECKPOINT']]);
});

test('streak is derived only from explicit declared streak events',()=>{
 const j={...journal,events:[...journal.events,{id:'e3',cursor:3,type:'STREAK_INCREMENT'}]};
 const p={...policy,streakEventType:'STREAK_INCREMENT'};
 assert.equal(projectGamification({journal:j,rewardPolicy:p}).streak,1);
 assert.equal(projectGamification({journal,rewardPolicy:p}).streak,0);
});

test('rejects malformed negative or non-finite XP rules',()=>{
 assert.throws(()=>projectGamification({journal,rewardPolicy:{...policy,xpByEvent:{CHECKPOINT:-1}}}),/xp/i);
 assert.throws(()=>projectGamification({journal,rewardPolicy:{...policy,xpByEvent:{CHECKPOINT:Infinity}}}),/xp/i);
});
