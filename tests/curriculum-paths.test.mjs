import test from 'node:test';
import assert from 'node:assert/strict';
import { createCapabilityGraph } from '../packages/curriculum/capability-graph.mjs';
import { createLevelProfile } from '../packages/curriculum/level-profile.mjs';
import { createLearningPath } from '../packages/curriculum/learning-path.mjs';

const graph = createCapabilityGraph({ id: 'a1', domains: [{ id: 'social', families: [{ id: 'intro', capabilities: [{ id: 'identity', microCapabilities: [
  { id: 'micro.ask-name', contract: Object.freeze({ id: 'spc.ask-name' }), prerequisites: [] },
  { id: 'micro.say-name', contract: Object.freeze({ id: 'spc.say-name' }), prerequisites: ['micro.ask-name'] }
] }] }] }] });

test('level profile keeps versioned proficiency expectations', () => {
  const p = createLevelProfile({ id: 'simpleway.a1', version: '1.0.0', capabilityIds: ['micro.ask-name'], expectations: { autonomy: 'guided', complexity: 'basic' } }, graph);
  assert.equal(p.version, '1.0.0');
  assert.deepEqual(p.capabilityIds, ['micro.ask-name']);
  assert.equal(p.expectations.autonomy, 'guided');
  assert.ok(Object.isFrozen(p));
});

test('learning path is ordered and respects prerequisites', () => {
  const path = createLearningPath({ id: 'a1.standard', version: '1.0.0', capabilityIds: ['micro.ask-name', 'micro.say-name'] }, graph);
  assert.deepEqual(path.capabilityIds, ['micro.ask-name', 'micro.say-name']);
  assert.ok(Object.isFrozen(path.capabilityIds));
});

test('profile and path reject unknown capability ids', () => {
  assert.throws(() => createLevelProfile({ id: 'bad', version: '1.0.0', capabilityIds: ['missing'], expectations: {} }, graph), /unknown capability/i);
  assert.throws(() => createLearningPath({ id: 'bad', version: '1.0.0', capabilityIds: ['missing'] }, graph), /unknown capability/i);
});

test('learning path rejects prerequisite order violations', () => {
  assert.throws(() => createLearningPath({ id: 'bad-order', version: '1.0.0', capabilityIds: ['micro.say-name', 'micro.ask-name'] }, graph), /prerequisite/i);
});