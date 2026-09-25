import test from 'node:test';
import assert from 'node:assert/strict';
import { compileGatedA1Unit } from '../packages/compiler/course-compiler.mjs';
const ready={microCapabilityId:'m1',linguistic:'READY',representation:{text:'READY',audio:'UNRESOLVED'},pedagogical:'READY',evidence:'READY'};

test('compiler gates reading independently from listening',()=>{
  const result=compileGatedA1Unit(ready,[{id:'read',representations:['text']},{id:'listen',representations:['audio']}]);
  assert.deepEqual(result.experiences.map(x=>x.id),['read']); assert.equal(result.blocked[0].id,'listen'); assert.match(result.blocked[0].reasons.join(' '),/audio/i);
});

test('unresolved, partial and not-applicable remain explicit',()=>{
  const unresolved=compileGatedA1Unit({...ready,linguistic:'UNRESOLVED'},[{id:'read',representations:['text']}]);
  assert.equal(unresolved.status,'UNRESOLVED'); assert.equal(unresolved.experiences.length,0);
  assert.equal(compileGatedA1Unit({...ready,linguistic:'PARTIAL'},[]).status,'PARTIAL');
  assert.equal(compileGatedA1Unit({...ready,linguistic:'NOT_APPLICABLE'},[]).status,'NOT_APPLICABLE');
});

test('blocked reason serialization is deterministic',()=>{
  const a=compileGatedA1Unit(ready,[{id:'listen',representations:['audio']}]); const b=compileGatedA1Unit(ready,[{id:'listen',representations:['audio']}]);
  assert.equal(JSON.stringify(a),JSON.stringify(b));
});