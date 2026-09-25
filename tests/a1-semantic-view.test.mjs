import test from 'node:test'; import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { A1_SEMANTIC_CURRICULUM } from '../packages/curriculum/a1/semantic-curriculum.mjs';
import { createA1SemanticView } from '../packages/curriculum/a1/semantic-view.mjs';
import { getLanguagePack } from '../packages/language-packs/catalog.mjs';

const snapshot=value=>JSON.stringify(value);
test('semantic view joins real goals and contracts without mutating structural curriculum',()=>{
  const before=snapshot(A1_CURRICULUM), view=createA1SemanticView(A1_CURRICULUM,A1_SEMANTIC_CURRICULUM);
  assert.equal(snapshot(A1_CURRICULUM),before); assert.equal(view.families.length,12);
  const caps=view.families.flatMap(f=>f.capabilities); assert.equal(caps.length,60); assert.equal(caps.flatMap(c=>c.microCapabilities).length,180);
  assert.ok(caps.every(c=>typeof c.semanticGoal==='string'&&c.semanticGoal.length>0)); assert.ok(caps.flatMap(c=>c.microCapabilities).every(m=>m.semanticContract));
});

test('semantic view preserves structural ids exactly',()=>{
  const view=createA1SemanticView(A1_CURRICULUM,A1_SEMANTIC_CURRICULUM);
  assert.deepEqual(view.families.map(f=>f.id),A1_CURRICULUM.families.map(f=>f.id));
  assert.deepEqual(view.families.flatMap(f=>f.capabilities.map(c=>c.id)),A1_CURRICULUM.families.flatMap(f=>f.capabilities.map(c=>c.id)));
});
test('creating semantic view leaves all language packs byte-equivalent',()=>{
  const ids=['english','hnk','esperanto']; const before=Object.fromEntries(ids.map(id=>[id,snapshot(getLanguagePack(id))]));
  createA1SemanticView(A1_CURRICULUM,A1_SEMANTIC_CURRICULUM);
  for(const id of ids) assert.equal(snapshot(getLanguagePack(id)),before[id]);
});

test('semantic view is read-only at joined levels',()=>{
  const view=createA1SemanticView(A1_CURRICULUM,A1_SEMANTIC_CURRICULUM);
  assert.ok(Object.isFrozen(view)); assert.ok(Object.isFrozen(view.families)); assert.ok(Object.isFrozen(view.families[0]));
  assert.ok(Object.isFrozen(view.families[0].capabilities[0])); assert.ok(Object.isFrozen(view.families[0].capabilities[0].microCapabilities[0]));
});
