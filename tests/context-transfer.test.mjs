import test from "node:test";
import assert from "node:assert/strict";
import { evaluateContextTransfer } from "../packages/lab/context-transfer.mjs";

const baseline = { id: "p1", capabilityId: "c1", inference: "observed-success", context: { setting: "lesson", task: "prompted", partner: "system" } };
const transfer = { id: "p2", capabilityId: "c1", inference: "observed-success", context: { setting: "dialogue", task: "free-response", partner: "peer" } };

test("observes transfer when same capability succeeds in a meaningfully changed context", () => {
 const r = evaluateContextTransfer({ baselineEvent: baseline, transferEvent: transfer });
 assert.equal(r.experiment, "EXP-23");
 assert.equal(r.dimension, "transfer");
 assert.equal(r.status, "observed");
 assert.deepEqual([...r.changedDimensions].sort(), ["partner", "setting", "task"]);
});

test("records not-observed when performance fails in changed context", () => {
 const r = evaluateContextTransfer({ baselineEvent: baseline, transferEvent: { ...transfer, inference: "observed-failure" } });
 assert.equal(r.status, "not-observed");
});

test("requires same capability and at least one declared context change", () => {
 assert.throws(() => evaluateContextTransfer({ baselineEvent: baseline, transferEvent: { ...transfer, capabilityId: "c2" } }), /capability/i);
 assert.throws(() => evaluateContextTransfer({ baselineEvent: baseline, transferEvent: { ...baseline, id: "p2" } }), /context/i);
});

test("does not equate one transfer observation with generalization or mastery", () => {
 const r = evaluateContextTransfer({ baselineEvent: baseline, transferEvent: transfer });
 assert.equal('generalized' in r, false);
 assert.equal('mastered' in r, false);
});
