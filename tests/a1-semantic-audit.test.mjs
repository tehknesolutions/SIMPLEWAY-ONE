import test from 'node:test'; import assert from 'node:assert/strict';
import { A1_SEMANTIC_CURRICULUM } from '../packages/curriculum/a1/semantic-curriculum.mjs';
import { auditA1Semantics, assertA1SemanticRelease } from '../packages/curriculum/a1/semantic-audit.mjs';
const clone=()=>structuredClone(A1_SEMANTIC_CURRICULUM);
const categories=data=>auditA1Semantics(data).map(x=>x.category);

test('real semantic dataset has zero release-blocking findings',()=>{assert.deepEqual(auditA1Semantics(A1_SEMANTIC_CURRICULUM),[]);assert.equal(assertA1SemanticRelease(A1_SEMANTIC_CURRICULUM),true);});

test('audit detects placeholders and duplicate goals',()=>{
  const placeholder=clone(); placeholder.families[0].capabilities[0].goal='capability 1'; assert.ok(categories(placeholder).includes('PLACEHOLDER'));
  const overlap=clone(); overlap.families[0].capabilities[1].goal=overlap.families[0].capabilities[0].goal; assert.ok(categories(overlap).includes('OVERLAP'));
});

test('audit detects missing boundaries and grammar prescriptions',()=>{
  const boundary=clone(); boundary.families[0].capabilities[0].contracts[0].contract.exclusions=[]; assert.ok(categories(boundary).includes('MISSING_BOUNDARY'));
  const grammar=clone(); grammar.families[0].capabilities[0].goal='use present simple for identity'; assert.ok(categories(grammar).includes('GRAMMAR_PRESCRIPTION'));
});
test('audit detects literal realizations and surface leakage',()=>{
  for(const literal of ['EN ZAMI HNK KE','Do you speak HNK?']){const data=clone();data.families[0].capabilities[0].goal=literal;assert.ok(categories(data).includes('LITERAL_REALIZATION'));}
  const leak=clone(); leak.families[0].capabilities[0].surface='hello'; assert.ok(categories(leak).includes('SURFACE_LEAK'));
});

test('release assertion fails closed and findings are deterministic',()=>{
  const data=clone(); data.families[0].capabilities[0].goal='capability 1';
  assert.deepEqual(auditA1Semantics(data),auditA1Semantics(data)); assert.throws(()=>assertA1SemanticRelease(data),/semantic release blocked/i);
});
