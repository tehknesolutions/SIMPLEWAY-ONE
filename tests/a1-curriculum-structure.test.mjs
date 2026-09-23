import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { validateA1Curriculum } from '../packages/curriculum/a1/validate-a1.mjs';

const expected = [15,12,12,15,18,15,15,15,15,15,15,18];
const flatten = curriculum => curriculum.families.flatMap(f => f.capabilities);

test('A1 has exact 12/60/180 mathematics and seven cycles', () => {
  const capabilities=flatten(A1_CURRICULUM); const micros=capabilities.flatMap(c=>c.microCapabilities);
  assert.equal(A1_CURRICULUM.families.length,12); assert.equal(capabilities.length,60); assert.equal(micros.length,180);
  assert.equal(A1_CURRICULUM.cycles.length,7); assert.deepEqual(A1_CURRICULUM.families.map(f=>f.microCount),expected);
  assert.ok(capabilities.every(c=>c.microCapabilities.length===3));
});

test('all curriculum ids are globally unique and every micro has a semantic-pragmatic contract', () => {
  const capabilities=flatten(A1_CURRICULUM); const micros=capabilities.flatMap(c=>c.microCapabilities);
  const ids=[...A1_CURRICULUM.families.map(x=>x.id),...capabilities.map(x=>x.id),...micros.map(x=>x.id)];
  assert.equal(new Set(ids).size,ids.length);
  assert.ok(micros.every(m=>m.contractId && m.communicativeIntent));
  assert.equal(validateA1Curriculum(A1_CURRICULUM),true);
});
test('validator rejects duplicate ids and broken family mathematics', () => {
  const clone=structuredClone(A1_CURRICULUM);
  clone.families[0].capabilities[0].microCapabilities[1].id=clone.families[0].capabilities[0].microCapabilities[0].id;
  assert.throws(()=>validateA1Curriculum(clone),/duplicate/i);
  const broken=structuredClone(A1_CURRICULUM); broken.families[0].capabilities.pop();
  assert.throws(()=>validateA1Curriculum(broken),/60|capabilit|family/i);
});

test('validator rejects missing contract or communicative intent', () => {
  const missingContract=structuredClone(A1_CURRICULUM); delete missingContract.families[0].capabilities[0].microCapabilities[0].contractId;
  assert.throws(()=>validateA1Curriculum(missingContract),/contract/i);
  const missingIntent=structuredClone(A1_CURRICULUM); delete missingIntent.families[0].capabilities[0].microCapabilities[0].communicativeIntent;
  assert.throws(()=>validateA1Curriculum(missingIntent),/intent/i);
});
