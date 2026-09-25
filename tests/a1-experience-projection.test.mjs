import test from 'node:test';
import assert from 'node:assert/strict';
import { projectA1Experiences } from '../packages/curriculum/a1/experience-projection.mjs';
const units=[{microCapabilityId:'m1',cycleId:'CONTACT',eligible:true},{microCapabilityId:'m2',cycleId:'CONTACT',eligible:true},{microCapabilityId:'m1',cycleId:'TRANSFER',eligible:true}];

test('multiple micro-capabilities group into one deterministic experience',()=>{
  const projected=projectA1Experiences(units,{CONTACT:'Mission',TRANSFER:'Scenario'});
  assert.equal(projected.length,2); assert.deepEqual(projected[0].microCapabilityIds,['m1','m2']); assert.equal(projected[0].type,'Mission');
});

test('one micro-capability may recur later without duplicate authority ids inside an experience',()=>{
  const projected=projectA1Experiences(units,{CONTACT:'Mission',TRANSFER:'Scenario'});
  assert.deepEqual(projected[1].microCapabilityIds,['m1']);
  assert.ok(projected.every(x=>new Set(x.microCapabilityIds).size===x.microCapabilityIds.length));
});

test('projection is deterministic and ignores ineligible units',()=>{
  const input=[...units,{microCapabilityId:'m3',cycleId:'CONTACT',eligible:false}];
  assert.equal(JSON.stringify(projectA1Experiences(input,{CONTACT:'Challenge',TRANSFER:'Review'})),JSON.stringify(projectA1Experiences(input,{CONTACT:'Challenge',TRANSFER:'Review'})));
});