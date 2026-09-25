import test from 'node:test'; import assert from 'node:assert/strict';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { A1_SEMANTIC_CURRICULUM, composeA1SemanticCurriculum } from '../packages/curriculum/a1/semantic-curriculum.mjs';
import { validateA1SemanticCurriculum } from '../packages/curriculum/a1/validate-semantic-curriculum.mjs';

test('composes exactly 12 families, 60 goals and 180 contracts',()=>{
  assert.equal(A1_SEMANTIC_CURRICULUM.families.length,12);
  const caps=A1_SEMANTIC_CURRICULUM.families.flatMap(f=>f.capabilities); assert.equal(caps.length,60);
  assert.equal(caps.flatMap(c=>c.contracts).length,180); assert.equal(validateA1SemanticCurriculum(A1_SEMANTIC_CURRICULUM,A1_CURRICULUM),true);
});

test('semantic ids equal the structural id sets exactly',()=>{
  const semCaps=A1_SEMANTIC_CURRICULUM.families.flatMap(f=>f.capabilities.map(c=>c.id));
  const strCaps=A1_CURRICULUM.families.flatMap(f=>f.capabilities.map(c=>c.id)); assert.deepEqual(semCaps,strCaps);
  const semMic=A1_SEMANTIC_CURRICULUM.families.flatMap(f=>f.capabilities.flatMap(c=>c.contracts.map(x=>x.id)));
  const strMic=A1_CURRICULUM.families.flatMap(f=>f.capabilities.flatMap(c=>c.microCapabilities.map(m=>m.id))); assert.deepEqual(semMic,strMic);
});

test('composition is deterministic regardless of catalog input order',()=>{
  const reversed=[...A1_SEMANTIC_CURRICULUM.families].reverse();
  assert.deepEqual(composeA1SemanticCurriculum(reversed,A1_CURRICULUM),A1_SEMANTIC_CURRICULUM);
});
test('validation fails closed for missing, duplicate and foreign semantic ids',()=>{
  const clone=()=>structuredClone(A1_SEMANTIC_CURRICULUM);
  const missing=clone(); missing.families[0].capabilities.pop(); assert.throws(()=>validateA1SemanticCurriculum(missing,A1_CURRICULUM),/capability|count|missing/i);
  const duplicate=clone(); duplicate.families[0].capabilities[1].id=duplicate.families[0].capabilities[0].id; assert.throws(()=>validateA1SemanticCurriculum(duplicate,A1_CURRICULUM),/duplicate|mismatch|id/i);
  const foreign=clone(); foreign.families[0].capabilities[0].contracts[0].id='A1-MIC-FOREIGN'; assert.throws(()=>validateA1SemanticCurriculum(foreign,A1_CURRICULUM),/foreign|mismatch|id/i);
});

test('all capability goals are non-empty and distinct within each family',()=>{
  for(const family of A1_SEMANTIC_CURRICULUM.families){const goals=family.capabilities.map(c=>c.goal);assert.ok(goals.every(Boolean));assert.equal(new Set(goals).size,goals.length);}
});
