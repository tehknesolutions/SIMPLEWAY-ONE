import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { validateSemanticContract } from '../packages/curriculum/a1/semantic-contract.mjs';
import F05 from '../packages/curriculum/a1/semantics/f05-actions-routine.mjs';
import F06 from '../packages/curriculum/a1/semantics/f06-people-objects-reference.mjs';
import F07 from '../packages/curriculum/a1/semantics/f07-quantity-basic-measure.mjs';
import F08 from '../packages/curriculum/a1/semantics/f08-time-sequence.mjs';
const catalogs=[F05,F06,F07,F08], structural=A1_CURRICULUM.families.slice(4,8);

test('families 05-08 preserve exact ids and 21 distinct goals',()=>{
  const goals=[]; catalogs.forEach((f,i)=>{assert.equal(f.familyId,structural[i].id);assert.deepEqual(f.capabilities.map(c=>c.id),structural[i].capabilities.map(c=>c.id));goals.push(...f.capabilities.map(c=>c.goal));});
  assert.equal(goals.length,21); assert.equal(new Set(goals).size,21);
});

test('families 05-08 provide exactly 63 valid contracts with exact micro ids',()=>{
  let count=0; catalogs.forEach((f,i)=>f.capabilities.forEach((c,j)=>{assert.equal(c.contracts.length,3);assert.deepEqual(c.contracts.map(x=>x.id),structural[i].capabilities[j].microCapabilities.map(m=>m.id));for(const x of c.contracts){assert.equal(validateSemanticContract(x.contract),true);count++;}})); assert.equal(count,63);
});

test('families 05-08 have no generic semantic placeholders',()=>assert.doesNotMatch(JSON.stringify(catalogs),/capability\s+\d+|communicative outcome\s+\d+/i));
