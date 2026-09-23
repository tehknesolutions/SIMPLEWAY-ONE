import test from 'node:test';
import assert from 'node:assert/strict';
import { createSemanticContract, validateSemanticContract } from '../packages/curriculum/a1/semantic-contract.mjs';

const valid={
  intent:'Establish a basic identity reference in an interaction',
  interactionRole:'Provide identity information when relevant to an introduction',
  semanticScope:['identity','participant reference'],
  pragmaticConditions:['an introduction or identity-check context'],
  evidenceCriteria:['learner conveys the intended identity reference recognizably'],
  exclusions:['does not establish biography, credentials, or legal identity'],
  depth:{core:'establish identity reference',context:'introductory exchange',boundary:'no extended biography'}
};

test('creates an immutable complete semantic-pragmatic contract',()=>{
  const contract=createSemanticContract(valid);
  assert.equal(validateSemanticContract(contract),true);
  assert.ok(Object.isFrozen(contract)); assert.ok(Object.isFrozen(contract.depth));
  assert.deepEqual(Object.keys(contract.depth),['core','context','boundary']);
});

test('requires every semantic field and a non-empty exclusion',()=>{
  for(const key of ['intent','interactionRole','semanticScope','pragmaticConditions','evidenceCriteria','exclusions','depth']){
    const broken={...valid}; delete broken[key]; assert.throws(()=>validateSemanticContract(broken),/required|exclusion|depth/i);
  }
  assert.throws(()=>validateSemanticContract({...valid,exclusions:[]}),/exclusion/i);
  assert.throws(()=>validateSemanticContract({...valid,evidenceCriteria:[]}),/evidence/i);
});
test('rejects generic numbered placeholders',()=>{
  assert.throws(()=>validateSemanticContract({...valid,intent:'Identity: capability 1, communicative outcome 2'}),/placeholder/i);
});

test('rejects language-specific grammar prescriptions',()=>{
  for(const phrase of ['word order','mandatory pronoun','present simple','copula','article','grammatical case','gender agreement']){
    assert.throws(()=>validateSemanticContract({...valid,intent:`Use ${phrase} to express identity`}),/prescription/i);
  }
});

test('requires core context and boundary semantic depth',()=>{
  assert.throws(()=>validateSemanticContract({...valid,depth:{core:'x',context:'y'}}),/boundary|depth/i);
});
