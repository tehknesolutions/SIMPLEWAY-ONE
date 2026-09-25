import test from "node:test";
import assert from "node:assert/strict";
import { validateEvidence } from "../packages/core/evidence.mjs";
import { validateProgressEvent } from "../packages/core/progress-event.mjs";

test("evidence links observation to activity and capability without claiming mastery", () => {
  const e = validateEvidence({ id: "ev-1", activityId: "identity-retrieval", capabilityId: "a1.identity.name", kind: "learner-response", evaluationLayers: [{ id: "meaning", status: "pass" }] });
  assert.equal(e.capabilityId, "a1.identity.name");
  assert.equal('mastered' in e, false);
});

test("progress event records bounded inference with evidence provenance", () => {
  const p = validateProgressEvent({ id: "pe-1", capabilityId: "a1.identity.name", evidenceIds: ["ev-1"], inference: "observed-success", scope: "single-activity" });
  assert.deepEqual(p.evidenceIds, ["ev-1"]);
  assert.equal(p.scope, "single-activity");
});

test("progress cannot silently claim mastery or exist without evidence", () => {
  assert.throws(() => validateProgressEvent({ id: "x", capabilityId: "c", evidenceIds: [], inference: "mastered", scope: "course" }), /evidence/i);
  assert.throws(() => validateProgressEvent({ id: "x", capabilityId: "c", evidenceIds: ["e"], mastered: true }), /mastered/i);
});

test("evidence preserves authority and source metadata opaquely", () => {
  const authority = { status: "validated", source: "hnk-pack", sourceLock: true };
  const e = validateEvidence({ id: "e", activityId: "a", capabilityId: "c", kind: "review", evaluationLayers: [], authority });
  assert.deepEqual(e.authority, authority);
});
