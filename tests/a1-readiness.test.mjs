import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateReadiness } from '../packages/curriculum/a1/readiness.mjs';
const cell={linguistic:'READY',representation:{text:'READY',audio:'UNRESOLVED'},pedagogical:'READY',evidence:'READY'};

test('text may be eligible while listening is blocked by missing audio',()=>{
  const reading=evaluateReadiness(cell,{representations:['text'],requiresPedagogy:true,requiresEvidence:true});
  const listening=evaluateReadiness(cell,{representations:['audio'],requiresPedagogy:true,requiresEvidence:true});
  assert.equal(reading.eligible,true); assert.equal(listening.eligible,false); assert.match(listening.reasons.join(' '),/audio/i);
});

test('linguistic unresolved blocks all realization-dependent experiences',()=>{
  const result=evaluateReadiness({...cell,linguistic:'UNRESOLVED'},{representations:['text']});
  assert.equal(result.eligible,false); assert.match(result.reasons.join(' '),/linguistic/i);
});

test('closed pedagogical or evidence gates block publication eligibility',()=>{
  assert.equal(evaluateReadiness({...cell,pedagogical:'PARTIAL'},{representations:['text'],requiresPedagogy:true}).eligible,false);
  assert.equal(evaluateReadiness({...cell,evidence:'UNRESOLVED'},{representations:['text'],requiresEvidence:true}).eligible,false);
});
