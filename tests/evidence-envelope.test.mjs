import test from 'node:test';
import assert from 'node:assert/strict';
import { createEvidenceEnvelope } from '../packages/authority/evidence-envelope.mjs';
import { canTransitionAuthority } from '../packages/authority/authority-transition.mjs';
const base={source:'source-1',provenance:{origin:'project'},authority:'CANDIDATE',scope:'a1.micro',validationHistory:[{at:'2026-09-23',action:'authored'}],version:'1.0.0'};

test('evidence envelope requires authority-bearing provenance and preserves optional integrity metadata',()=>{
  const value=createEvidenceEnvelope({...base,evidenceStrength:0.8,integrityHash:'abc'});
  assert.equal(value.authority,'CANDIDATE'); assert.equal(value.evidenceStrength,0.8); assert.equal(value.integrityHash,'abc'); assert.ok(Object.isFrozen(value));
});

test('required envelope fields fail closed',()=>{
  for(const field of ['source','provenance','authority','scope','validationHistory','version']){const input=structuredClone(base);delete input[field];assert.throws(()=>createEvidenceEnvelope(input),new RegExp(field==='validationHistory'?'validation':field,'i'));}
});

test('authority transitions follow explicit ladder',()=>{
  assert.equal(canTransitionAuthority('UNRESOLVED','CANDIDATE',{}),true); assert.equal(canTransitionAuthority('CANDIDATE','VALIDATED',{}),true);
  assert.equal(canTransitionAuthority('VALIDATED','PEDAGOGICALLY_APPROVED',{}),true); assert.equal(canTransitionAuthority('PEDAGOGICALLY_APPROVED','READY',{}),true);
  assert.equal(canTransitionAuthority('UNRESOLVED','READY',{}),false);
});
test('AI generated content cannot directly promote to validated canonical or ready authority',()=>{
  for(const target of ['VALIDATED','CANONICAL','READY']) assert.equal(canTransitionAuthority('CANDIDATE',target,{sourceAuthority:'AI_GENERATED'}),false);
});

test('coverage status is not accepted as authority',()=>{
  assert.throws(()=>createEvidenceEnvelope({...base,authority:'PARTIAL'}),/authority/i);
});
