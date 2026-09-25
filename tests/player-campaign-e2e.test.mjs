import test from 'node:test';
import assert from 'node:assert/strict';
import {createA1PlayerCampaignInput} from '../packages/app/a1-player-campaign.mjs';
import {createCampaignPlayerSession,applyCampaignPlayerEvent} from '../packages/app/campaign-player-session.mjs';
import {createCampaignPlayerViewModel} from '../packages/app/player-view-model.mjs';

const AS_OF='2026-09-25T20:00:00-03:00';
const start=id=>{const input=createA1PlayerCampaignInput({languagePackId:id,asOf:AS_OF});return {input,session:createCampaignPlayerSession(input)};};

test('HNK Campaign -> Mission -> Player pins canonical first vertical',()=>{
 const {session}=start('hnk'); const vm=createCampaignPlayerViewModel({session});
 assert.equal(session.status,'SELECTED'); assert.equal(vm.primaryRepresentation.value,'EN ZAMI HNK KE'); assert.equal(vm.canAdvance,true);
});

test('explicit evidence event is authoritative through Journal replay and deterministic reload',()=>{
 const {input,session}=start('hnk'); const [nodeId]=Object.entries(session.projection.nodes).find(([,n])=>n.state==='AVAILABLE');
 const targetId=input.definition.nodes.find(item=>item.id===nodeId).targetId;
 const event={id:'e2e-1',cursor:1,campaignId:input.definition.id,definitionVersion:input.definition.version,type:'EVIDENCE',targetId,nodeId,accepted:true,at:'2026-09-25T20:01:00-03:00'};
 const after=applyCampaignPlayerEvent(input,event); const replay=createCampaignPlayerSession({...input,journal:after.journal});
 assert.deepEqual(replay,after); assert.equal(after.journal.events[0].id,'e2e-1'); assert.equal(after.status,'CAMPAIGN_COMPLETE');
});
test('Esperanto remains unresolved and Player fabricates no content',()=>{
 const {session}=start('esperanto'); const vm=createCampaignPlayerViewModel({session});
 assert.equal(session.status,'NO_ELIGIBLE_MISSION'); assert.equal(session.mission,null); assert.equal(vm.primaryRepresentation,null); assert.deepEqual(vm.auxiliaryRepresentations,[]); assert.equal(vm.canAdvance,false);
});

test('repeated target participation keeps evidence node-scoped',async()=>{
 const {createCycleMap,A1_CAMPAIGN_CYCLES:cycles}=await import('../packages/campaign/a1/cycle-map.mjs');
 const {createCampaignDefinition}=await import('../packages/campaign/a1/campaign-definition.mjs');
 const {createCampaignJournal}=await import('../packages/campaign/a1/campaign-journal.mjs');
 const base=start('hnk').input, target=base.definition.nodes[0].targetId;
 const cycleMap=createCycleMap({id:'e2e-repeat-map',version:'1',cycles,participations:[{targetId:target,cycle:'CONTACT',role:'INTRODUCE'},{targetId:target,cycle:'REFERENCE',role:'REINFORCE'}]});
 const definition=createCampaignDefinition({id:'e2e-repeat',version:'1.5',cycleMap,nodes:[{id:'r1',targetId:target,cycle:'CONTACT',role:'INTRODUCE'},{id:'r2',targetId:target,cycle:'REFERENCE',role:'REINFORCE'}],edges:[{from:'r1',to:'r2'}],gates:[]});
 const journal=createCampaignJournal({campaignId:definition.id,definitionVersion:definition.version,events:[]});
 const input={...base,definition,journal};
 const after=applyCampaignPlayerEvent(input,{id:'repeat-e1',cursor:1,campaignId:definition.id,definitionVersion:definition.version,type:'EVIDENCE',targetId:target,nodeId:'r1',accepted:true,at:'2026-09-25T20:01:00-03:00'});
 assert.deepEqual(after.projection.nodes.r1.eventIds,['repeat-e1']); assert.deepEqual(after.projection.nodes.r2.eventIds,[]); assert.equal(after.projection.nodes.r2.state,'AVAILABLE');
});


