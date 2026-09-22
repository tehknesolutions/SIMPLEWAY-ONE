import test from "node:test";
import assert from "node:assert/strict";
import { validateActivity } from "../packages/core/activity.mjs";
import { validateEvaluation } from "../packages/core/evaluation.mjs";

test("activity targets a capability without prescribing a language grammar", () => {
  const a = validateActivity({ id: "identity-retrieval", capabilityId: "a1.identity.name", mode: "retrieval", response: { channel: "text" } });
  assert.equal(a.capabilityId, "a1.identity.name");
  assert.equal(a.mode, "retrieval");
});

test("evaluation keeps independent layers instead of universal isCorrect", () => {
  const e = validateEvaluation({ activityId: "identity-retrieval", layers: [{ id: "form", status: "pass" }, { id: "meaning", status: "needs-review" }, { id: "context", status: "pass" }] });
  assert.equal(e.layers.length, 3);
  assert.equal(e.layers[1].status, "needs-review");
  assert.equal('isCorrect' in e, false);
});

test("evaluation may preserve authority/evidence without interpreting it", () => {
  const authority = { status: "validated", source: "language-pack" };
  const e = validateEvaluation({ activityId: "x", layers: [], authority });
  assert.deepEqual(e.authority, authority);
});

test("core rejects language-specific activity semantics and monolithic correctness", () => {
  assert.throws(() => validateActivity({ id: "x", capabilityId: "c", tense: "present" }), /language-specific/i);
  assert.throws(() => validateEvaluation({ activityId: "x", layers: [], isCorrect: true }), /isCorrect/i);
});
