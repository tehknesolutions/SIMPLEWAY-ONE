import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { buildCoverageMatrix, summarizeCoverage } from '../packages/curriculum/a1/coverage-matrix.mjs';
const micros=A1_CURRICULUM.families.flatMap(f=>f.capabilities).flatMap(c=>c.microCapabilities).map(m=>m.id);

test('coverage matrix always has exactly 180 cells and defaults absent realization to unresolved',()=>{
  const matrix=buildCoverageMatrix(A1_CURRICULUM,{id:'empty',version:'1',realizations:[]});
  assert.equal(matrix.cells.length,180); assert.ok(matrix.cells.every(c=>c.linguistic==='UNRESOLVED'));
});

test('summary distinguishes coverage states and dimensions',()=>{
  const pack={id:'fixture',version:'1',realizations:[
    {capabilityId:micros[0],status:'READY',bundle:{primary:{value:'x'},audio:{src:'x.mp3'}},activityStatus:'READY',evidenceStatus:'READY'},
    {capabilityId:micros[1],status:'PARTIAL',bundle:{primary:{value:'y'}},activityStatus:'PARTIAL',evidenceStatus:'READY'},
    {capabilityId:micros[2],status:'NOT_APPLICABLE'}]};
  const summary=summarizeCoverage(buildCoverageMatrix(A1_CURRICULUM,pack));
  assert.deepEqual(summary.linguistic,{READY:1,PARTIAL:1,UNRESOLVED:177,NOT_APPLICABLE:1});
  assert.equal(summary.representation.text.READY,2); assert.equal(summary.representation.audio.READY,1);
  assert.equal(summary.activity.READY,1); assert.equal(summary.evidence.READY,2); assert.equal(summary.compilation.READY,1);
});
