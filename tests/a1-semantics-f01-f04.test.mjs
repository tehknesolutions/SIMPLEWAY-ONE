import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { validateSemanticContract } from '../packages/curriculum/a1/semantic-contract.mjs';
import F01 from '../packages/curriculum/a1/semantics/f01-identity-introduction.mjs';
import F02 from '../packages/curriculum/a1/semantics/f02-basic-social-interaction.mjs';
import F03 from '../packages/curriculum/a1/semantics/f03-existence-location.mjs';
import F04 from '../packages/curriculum/a1/semantics/f04-needs-wants-intention.mjs';

const catalogs=[F01,F02,F03,F04];
const structural=A1_CURRICULUM.families.slice(0,4);

test('families 01-04 preserve exact V1.1 ids and 18 distinct capability goals',()=>{
  const goals=[];
  catalogs.forEach((catalog,index)=>{
    assert.equal(catalog.familyId,structural[index].id);
    assert.deepEqual(catalog.capabilities.map(c=>c.id),structural[index].capabilities.map(c=>c.id));
    goals.push(...catalog.capabilities.map(c=>c.goal));
  });
  assert.equal(goals.length,18); assert.equal(new Set(goals).size,18);
});

test('families 01-04 contain exactly 54 complete semantic contracts',()=>{
  const contracts=catalogs.flatMap(f=>f.capabilities.flatMap(c=>c.contracts));
  assert.equal(contracts.length,54); assert.ok(contracts.every(x=>validateSemanticContract(x.contract)));
  catalogs.forEach(f=>f.capabilities.forEach(c=>assert.equal(c.contracts.length,3)));
});
test('every capability maps its exact three V1.1 micro ids',()=>{
  catalogs.forEach((catalog,index)=>catalog.capabilities.forEach((cap,capIndex)=>{
    const expected=structural[index].capabilities[capIndex].microCapabilities.map(m=>m.id);
    assert.deepEqual(cap.contracts.map(x=>x.id),expected);
  }));
});

test('authored goals and contracts contain no generic numbered placeholders',()=>{
  const text=JSON.stringify(catalogs);
  assert.doesNotMatch(text,/capability\s+\d+|communicative outcome\s+\d+/i);
});
