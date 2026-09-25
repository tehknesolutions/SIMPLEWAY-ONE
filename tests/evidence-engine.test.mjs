import test from 'node:test';
import assert from 'node:assert/strict';
import { createEvidenceEvent } from '../packages/evidence/evidence-event.mjs';
import { projectEvidence } from '../packages/evidence/evidence-profile.mjs';
import { evaluateProgress } from '../packages/evidence/progress-policy.mjs';

const types = ['recognition','comprehension','recall','production','interaction','transfer','retention'];
const event = (id, type, at, extra={}) => createEvidenceEvent({ id, learnerId:'learner-1', capabilityId:'cap-1', activityId:'act-1', type, at, supportLevel:'none', attempts:1, modality:'text', context:'lesson', ...extra });

test('evidence event accepts all universal evidence dimensions and metadata', () => {
  for (const [index, type] of types.entries()) {
    const value = event(`e${index}`, type, `2026-09-23T12:0${index}:00.000Z`, { elapsedMs:index * 1000 });
    assert.equal(value.type, type);
    assert.equal(value.supportLevel, 'none');
    assert.equal(value.attempts, 1);
    assert.ok(Object.isFrozen(value));
  }
});

test('projection is deterministic and orders immutable history by timestamp then id', () => {
  const input = [event('b','recall','2026-09-23T12:01:00.000Z'), event('a','recognition','2026-09-23T12:00:00.000Z')];
  const first = projectEvidence(input);
  const second = projectEvidence([...input].reverse());
  assert.deepEqual(first, second);
  assert.deepEqual(first.history.map(x => x.id), ['a','b']);
  assert.ok(Object.isFrozen(first.history));
});
test('progress policy returns an explainable route decision, never mastery', () => {
  const profile = projectEvidence([event('a','recall','2026-09-23T12:00:00.000Z'), event('b','production','2026-09-23T12:01:00.000Z')]);
  const result = evaluateProgress(profile, { id:'a1-standard', version:'1.0.0', requireEvidenceTypes:['recall','production'], minimumEvents:2 });
  assert.equal(result.decision, 'ADVANCE');
  assert.ok(result.reasons.length > 0);
  assert.equal('mastered' in result, false);
  assert.equal('isCorrect' in result, false);
});

test('progress holds with explicit reasons when evidence is insufficient', () => {
  const profile = projectEvidence([event('a','recognition','2026-09-23T12:00:00.000Z')]);
  const result = evaluateProgress(profile, { id:'a1-standard', version:'1.0.0', requireEvidenceTypes:['recall'], minimumEvents:2 });
  assert.equal(result.decision, 'HOLD');
  assert.match(result.reasons.join(' '), /recall|events/i);
});

test('invalid event types and metadata fail closed', () => {
  assert.throws(() => event('bad','mastery','2026-09-23T12:00:00.000Z'), /type/i);
  assert.throws(() => event('bad','recall','2026-09-23T12:00:00.000Z',{attempts:0}), /attempt/i);
});
