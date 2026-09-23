import test from 'node:test';
import assert from 'node:assert/strict';
import { createRepresentationBundle } from '../packages/language-packs/representation-bundle.mjs';
import { createLanguagePackV2 } from '../packages/language-packs/language-pack-v2.mjs';
import { getLanguagePack } from '../packages/language-packs/catalog.mjs';

const provenance = { source: 'validated-fixture', authority: 'VALIDATED' };

test('representation bundle preserves multimodal and RTL metadata', () => {
  const bundle = createRepresentationBundle({ id:'ar.demo', primary:{ value:'مرحبا', script:'Arab', direction:'rtl' }, transliteration:'marhaban', audio:{ src:'demo.mp3' }, glyph:{ value:'◇' }, provenance, customFeature:{ kind:'fixture' } });
  assert.equal(bundle.primary.direction, 'rtl');
  assert.equal(bundle.transliteration, 'marhaban');
  assert.equal(bundle.audio.src, 'demo.mp3');
  assert.equal(bundle.glyph.value, '◇');
  assert.deepEqual(bundle.customFeature, { kind:'fixture' });
  assert.ok(Object.isFrozen(bundle));
});

test('language pack v2 preserves all realization coverage states', () => {
  const pack = createLanguagePackV2({ id:'fixture', version:'1.0.0', schemaVersion:'2', curriculumCompatibility:['a1@1'], realizations:[
    { capabilityId:'c.ready', status:'READY', bundle:createRepresentationBundle({id:'b1', primary:{value:'x',script:'Latn',direction:'ltr'}, provenance}) },
    { capabilityId:'c.partial', status:'PARTIAL', bundle:createRepresentationBundle({id:'b2', primary:{value:'y',script:'Latn',direction:'ltr'}, provenance}) },
    { capabilityId:'c.unresolved', status:'UNRESOLVED', provenance },
    { capabilityId:'c.na', status:'NOT_APPLICABLE', provenance }
  ] });
  assert.deepEqual(pack.realizations.map(x => x.status), ['READY','PARTIAL','UNRESOLVED','NOT_APPLICABLE']);
  assert.ok(Object.isFrozen(pack));
});
test('catalog exposes v2 metadata without changing canonical HNK bytes', () => {
  const hnk = getLanguagePack('hnk');
  const english = getLanguagePack('english');
  const esperanto = getLanguagePack('esperanto');
  assert.equal(hnk.version, '1.0.0');
  assert.equal(hnk.realizations[0].bundle.primary.value, 'EN ZAMI HNK KE');
  assert.equal(english.realizations[0].status, 'READY');
  assert.equal(esperanto.realizations[0].status, 'UNRESOLVED');
  assert.equal(esperanto.realizations[0].bundle, undefined);
});

test('invalid representation direction and realization status fail closed', () => {
  assert.throws(() => createRepresentationBundle({ id:'bad', primary:{value:'x',script:'Latn',direction:'sideways'}, provenance }), /direction/i);
  assert.throws(() => createLanguagePackV2({ id:'bad', version:'1.0.0', schemaVersion:'2', curriculumCompatibility:['a1@1'], realizations:[{capabilityId:'x', status:'GUESSED', provenance}] }), /status/i);
});