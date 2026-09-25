import test from 'node:test'; import assert from 'node:assert/strict'; import crypto from 'node:crypto';
import { A1_CURRICULUM } from '../packages/curriculum/a1/curriculum.mjs';
import { A1_SEMANTIC_CURRICULUM } from '../packages/curriculum/a1/semantic-curriculum.mjs';
import { validateA1SemanticCurriculum } from '../packages/curriculum/a1/validate-semantic-curriculum.mjs';
import { auditA1Semantics } from '../packages/curriculum/a1/semantic-audit.mjs';
import { getLanguagePack } from '../packages/language-packs/catalog.mjs';
import { mapExistingRealizations } from '../packages/curriculum/a1/existing-realizations.mjs';
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');

test('V1.2 preserves 12/60/180/7 and exact V1.1 ids',()=>{
  assert.equal(validateA1SemanticCurriculum(A1_SEMANTIC_CURRICULUM,A1_CURRICULUM),true); assert.equal(A1_CURRICULUM.cycles.length,7);
  const caps=A1_SEMANTIC_CURRICULUM.families.flatMap(f=>f.capabilities); assert.equal(A1_SEMANTIC_CURRICULUM.families.length,12);assert.equal(caps.length,60);assert.equal(caps.flatMap(c=>c.contracts).length,180);
});

test('V1.2 has zero semantic audit blockers and deterministic serialization',()=>{
  assert.deepEqual(auditA1Semantics(A1_SEMANTIC_CURRICULUM),[]); const a=JSON.stringify(A1_SEMANTIC_CURRICULUM),b=JSON.stringify(A1_SEMANTIC_CURRICULUM);assert.equal(a,b);assert.equal(hash(a),hash(b));
});
test('V1.2 leaves canonical HNK realization and Esperanto gap unchanged',()=>{
  const hnk=mapExistingRealizations(getLanguagePack('hnk')).realizations[0]; assert.equal(hnk.bundle.primary.value,'EN ZAMI HNK KE');
  const eo=mapExistingRealizations(getLanguagePack('esperanto')).realizations[0]; assert.equal(eo.status,'UNRESOLVED'); assert.equal(eo.bundle,undefined);
});

test('V1.2 capability goals are meaningful and contracts complete',()=>{
  const caps=A1_SEMANTIC_CURRICULUM.families.flatMap(f=>f.capabilities); assert.ok(caps.every(c=>c.goal.length>20));
  for(const entry of caps.flatMap(c=>c.contracts)){const x=entry.contract;assert.ok(x.intent&&x.interactionRole&&x.semanticScope.length&&x.pragmaticConditions.length&&x.evidenceCriteria.length&&x.exclusions.length&&x.depth.core&&x.depth.context&&x.depth.boundary);}
});
