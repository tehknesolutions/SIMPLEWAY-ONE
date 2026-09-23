import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { A1_CYCLES, createCycleAssignment, validateCycleAssignments } from '../packages/curriculum/a1/cycles.mjs';
const micros=A1_CURRICULUM.families.flatMap(f=>f.capabilities).flatMap(c=>c.microCapabilities).map(m=>m.id);

test('seven pedagogical cycles have exact order',()=>{
  assert.deepEqual(A1_CYCLES.map(c=>c.id),['CONTACT','REFERENCE','ACTION','CONTEXT','INTERACTION','TRANSFER','AUTONOMY']);
});

test('a micro-capability may recur across cycles without duplicating authority',()=>{
  const assignments=[createCycleAssignment({microCapabilityId:micros[0],cycleId:'CONTACT'}),createCycleAssignment({microCapabilityId:micros[0],cycleId:'TRANSFER'})];
  assert.equal(validateCycleAssignments(assignments,A1_CURRICULUM),true); assert.equal(new Set(assignments.map(a=>a.microCapabilityId)).size,1);
});

test('unknown cycles and nodes fail closed',()=>{
  assert.throws(()=>createCycleAssignment({microCapabilityId:micros[0],cycleId:'MASTER'}),/cycle/i);
  assert.throws(()=>validateCycleAssignments([{microCapabilityId:'missing',cycleId:'CONTACT'}],A1_CURRICULUM),/unknown/i);
});
