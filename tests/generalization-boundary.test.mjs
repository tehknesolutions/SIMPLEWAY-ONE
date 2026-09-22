import test from "node:test";
import assert from "node:assert/strict";
import { evaluateGeneralizationBoundary } from "../packages/lab/generalization-boundary.mjs";

const cases = [
 { id: "n1", novelty: { setting: "new" }, outcome: "success" },
 { id: "n2", novelty: { task: "new" }, outcome: "success" },
 { id: "n3", novelty: { partner: "new", representation: "new" }, outcome: "failure" }
];

test("EXP-28 maps observed success and failure across genuinely novel cases", () => {
 const r = evaluateGeneralizationBoundary({ capabilityId: "c1", cases });
 assert.equal(r.experiment, "EXP-28");
 assert.equal(r.dimension, "generalization");
 assert.equal(r.successCount, 2);
 assert.equal(r.failureCount, 1);
 assert.deepEqual(r.failedCaseIds, ["n3"]);
});

test("reports observed dimensions without inventing a universal boundary score", () => {
 const r = evaluateGeneralizationBoundary({ capabilityId: "c1", cases });
 assert.deepEqual([...r.noveltyDimensions].sort(), ["partner", "representation", "setting", "task"]);
 assert.equal('score' in r, false);
 assert.equal('threshold' in r, false);
});

test("requires multiple novel cases and explicit novelty", () => {
 assert.throws(() => evaluateGeneralizationBoundary({ capabilityId: "c1", cases: [cases[0]] }), /multiple/i);
 assert.throws(() => evaluateGeneralizationBoundary({ capabilityId: "c1", cases: [{ id: "x", novelty: {}, outcome: "success" }, cases[1]] }), /novelty/i);
});

test("rejects unsupported outcomes and does not declare generalized or mastered", () => {
 assert.throws(() => evaluateGeneralizationBoundary({ capabilityId: "c1", cases: [{ ...cases[0], outcome: "maybe" }, cases[1]] }), /outcome/i);
 const r = evaluateGeneralizationBoundary({ capabilityId: "c1", cases });
 assert.equal('generalized' in r, false);
 assert.equal('mastered' in r, false);
});
