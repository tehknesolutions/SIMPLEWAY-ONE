import test from 'node:test';
import assert from 'node:assert/strict';
import { createActivityContract } from '../packages/activities/activity-contract.mjs';
import { createEvaluationPolicy } from '../packages/activities/evaluation-policy.mjs';

const observational = () => createEvaluationPolicy({ id:'observe.production', version:'1.0.0', mode:'observational', evidenceTypes:['production'] });

test('activity contract is renderer-independent and declares modalities/evidence', () => {
  const activity = createActivityContract({
    id:'act.ask-name', version:'1.0.0', targetMicroCapabilities:['ask-name'],
    stimulusModalities:['text'], responseModalities:['speech','text'], supports:['hint'],
    evidenceTypes:['recall','production'], evaluationPolicyId:'observe.production', rendererHints:['input','speech']
  });
  assert.deepEqual(activity.targetMicroCapabilities, ['ask-name']);
  assert.deepEqual(activity.responseModalities, ['speech','text']);
  assert.equal(activity.evaluationPolicyId, 'observe.production');
  assert.ok(Object.isFrozen(activity));
});

test('evaluation policy supports observational and non-binary modes', () => {
  const policy = observational();
  const semantic = createEvaluationPolicy({ id:'semantic.production', version:'1.0.0', mode:'semantic', evidenceTypes:['production','transfer'] });
  assert.equal(policy.mode, 'observational');
  assert.equal(semantic.mode, 'semantic');
  assert.equal('isCorrect' in policy, false);
});
test('contracts reject universal correctness/mastery source-of-truth fields', () => {
  assert.throws(() => createActivityContract({ id:'bad', version:'1', targetMicroCapabilities:['x'], stimulusModalities:['text'], responseModalities:['text'], evidenceTypes:['recall'], evaluationPolicyId:'p', mastered:true }), /mastered/i);
  assert.throws(() => createEvaluationPolicy({ id:'bad', version:'1', mode:'exact', evidenceTypes:['recall'], isCorrect:true }), /isCorrect/i);
});

test('activity requires targets, modalities, evidence and evaluation policy', () => {
  assert.throws(() => createActivityContract({ id:'bad', version:'1', targetMicroCapabilities:[], stimulusModalities:['text'], responseModalities:['text'], evidenceTypes:['recall'], evaluationPolicyId:'p' }), /target/i);
  assert.throws(() => createActivityContract({ id:'bad', version:'1', targetMicroCapabilities:['x'], stimulusModalities:['text'], responseModalities:[], evidenceTypes:['recall'], evaluationPolicyId:'p' }), /response/i);
  assert.throws(() => createActivityContract({ id:'bad', version:'1', targetMicroCapabilities:['x'], stimulusModalities:['text'], responseModalities:['text'], evidenceTypes:[], evaluationPolicyId:'p' }), /evidence/i);
});
