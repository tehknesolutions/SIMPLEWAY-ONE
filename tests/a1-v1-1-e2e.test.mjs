import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { validateA1Curriculum } from '../packages/curriculum/a1/validate-a1.mjs';
import { getLanguagePack } from '../packages/language-packs/catalog.mjs';
import { mapExistingRealizations } from '../packages/curriculum/a1/existing-realizations.mjs';
import { buildCoverageMatrix } from '../packages/curriculum/a1/coverage-matrix.mjs';

test('V1.1 exact structural release mathematics hold',()=>{
  assert.equal(validateA1Curriculum(A1_CURRICULUM),true); const caps=A1_CURRICULUM.families.flatMap(f=>f.capabilities);
  assert.equal(A1_CURRICULUM.families.length,12); assert.equal(caps.length,60); assert.equal(caps.flatMap(c=>c.microCapabilities).length,180); assert.equal(A1_CURRICULUM.cycles.length,7);
});

for(const id of ['english','hnk','esperanto']) test(`${id} exposes 180 explicit A1 coverage cells`,()=>{
  assert.equal(buildCoverageMatrix(A1_CURRICULUM,mapExistingRealizations(getLanguagePack(id))).cells.length,180);
});

test('release preserves canonical HNK and explicit Esperanto gap',()=>{
  assert.equal(mapExistingRealizations(getLanguagePack('hnk')).realizations[0].bundle.primary.value,'EN ZAMI HNK KE');
  const eo=mapExistingRealizations(getLanguagePack('esperanto')).realizations[0]; assert.equal(eo.status,'UNRESOLVED'); assert.equal(eo.bundle,undefined);
});