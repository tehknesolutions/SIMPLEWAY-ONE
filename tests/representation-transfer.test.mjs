import test from "node:test";
import assert from "node:assert/strict";
import { evaluateRepresentationTransfer } from "../packages/lab/representation-transfer.mjs";

const baseline = { id: "p1", capabilityId: "c1", inference: "observed-success", representation: { channel: "text", script: "Latn", role: "transliteration" } };
const transfer = { id: "p2", capabilityId: "c1", inference: "observed-success", representation: { channel: "text", script: "Jpan", role: "primary" } };

test("observes transfer when success persists across a changed representation", () => {
 const r = evaluateRepresentationTransfer({ baselineEvent: baseline, transferEvent: transfer });
 assert.equal(r.experiment, "EXP-24");
 assert.equal(r.dimension, "representation-transfer");
 assert.equal(r.status, "observed");
 assert.deepEqual([...r.changedDimensions].sort(), ["role", "script"]);
});

test("can detect cross-channel representation change such as audio to text", () => {
 const r = evaluateRepresentationTransfer({ baselineEvent: { ...baseline, representation: { channel: "audio", role: "primary" } }, transferEvent: { ...transfer, representation: { channel: "text", script: "Jpan", role: "primary" } } });
 assert.ok(r.changedDimensions.includes("channel"));
});

test("records not-observed when performance fails after representation change", () => {
 const r = evaluateRepresentationTransfer({ baselineEvent: baseline, transferEvent: { ...transfer, inference: "observed-failure" } });
 assert.equal(r.status, "not-observed");
});

test("requires same capability and an actual representation change", () => {
 assert.throws(() => evaluateRepresentationTransfer({ baselineEvent: baseline, transferEvent: { ...transfer, capabilityId: "c2" } }), /capability/i);
 assert.throws(() => evaluateRepresentationTransfer({ baselineEvent: baseline, transferEvent: { ...baseline, id: "p2" } }), /representation/i);
});

test("does not equate one representation transfer with generalization or mastery", () => {
 const r = evaluateRepresentationTransfer({ baselineEvent: baseline, transferEvent: transfer });
 assert.equal('generalized' in r, false);
 assert.equal('mastered' in r, false);
});
