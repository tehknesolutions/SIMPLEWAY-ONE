import test from 'node:test';
import assert from 'node:assert/strict';
import { getLanguagePack } from '../packages/language-packs/catalog.mjs';
import { A1_EXISTING_TARGET, mapExistingRealizations } from '../packages/curriculum/a1/existing-realizations.mjs';

for(const id of ['english','hnk','esperanto']) test(`${id} maps only existing evidence to the A1 spine`,()=>{
  const mapped=mapExistingRealizations(getLanguagePack(id));
  assert.equal(mapped.realizations.length,1); assert.equal(mapped.realizations[0].capabilityId,A1_EXISTING_TARGET);
  assert.ok(mapped.realizations[0].evidenceEnvelope);
});

test('HNK canonical bytes and English existing bytes are preserved',()=>{
  assert.equal(mapExistingRealizations(getLanguagePack('hnk')).realizations[0].bundle.primary.value,'EN ZAMI HNK KE');
  assert.equal(mapExistingRealizations(getLanguagePack('english')).realizations[0].bundle.primary.value,'Do you speak HNK?');
});

test('Esperanto remains unresolved and no realization is invented',()=>{
  const r=mapExistingRealizations(getLanguagePack('esperanto')).realizations[0];
  assert.equal(r.status,'UNRESOLVED'); assert.equal(r.bundle,undefined);
});