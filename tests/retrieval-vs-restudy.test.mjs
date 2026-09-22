import test from "node:test";
import assert from "node:assert/strict";
import { compareRetrievalVsRestudy } from "../packages/lab/retrieval-vs-restudy.mjs";

const retrieval = { condition: "retrieval", capabilityId: "c1", observations: [{ participantId: "u1", outcome: "success" }, { participantId: "u2", outcome: "success" }, { participantId: "u3", outcome: "failure" }] };
const restudy = { condition: "restudy", capabilityId: "c1", observations: [{ participantId: "u4", outcome: "success" }, { participantId: "u5", outcome: "failure" }, { participantId: "u6", outcome: "failure" }] };

test("EXP-25 summarizes observed outcomes by condition without declaring a winner", () => {
 const r = compareRetrievalVsRestudy({ retrieval, restudy, measure: "delayed-retention" });
 assert.equal(r.experiment, "EXP-25");
 assert.equal(r.measure, "delayed-retention");
 assert.equal(r.conditions.retrieval.successRate, 2 / 3);
 assert.equal(r.conditions.restudy.successRate, 1 / 3);
 assert.equal('winner' in r, false);
});

test("preserves sample sizes and raw outcome counts", () => {
 const r = compareRetrievalVsRestudy({ retrieval, restudy, measure: "transfer" });
 assert.equal(r.conditions.retrieval.n, 3);
 assert.deepEqual(r.conditions.restudy.counts, { success: 1, failure: 2 });
});

test("rejects mixed capabilities, unsupported conditions, and empty samples", () => {
 assert.throws(() => compareRetrievalVsRestudy({ retrieval, restudy: { ...restudy, capabilityId: "c2" }, measure: "retention" }), /capability/i);
 assert.throws(() => compareRetrievalVsRestudy({ retrieval: { ...retrieval, condition: "lecture" }, restudy, measure: "retention" }), /condition/i);
 assert.throws(() => compareRetrievalVsRestudy({ retrieval: { ...retrieval, observations: [] }, restudy, measure: "retention" }), /observations/i);
});

test("does not infer causality, superiority, significance, or mastery from descriptive comparison", () => {
 const r = compareRetrievalVsRestudy({ retrieval, restudy, measure: "delayed-retention" });
 for (const field of ["causal", "superior", "significant", "mastered"]) assert.equal(field in r, false);
});
