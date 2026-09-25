import test from "node:test";
import assert from "node:assert/strict";
import { evaluateMediation } from "../packages/lab/mediation.mjs";

const case1 = { capabilityId: "c1", source: { id: "s1", representation: "written", complexity: "source" }, target: { audience: "peer", representation: "spoken", complexity: "simplified" }, outcome: "success", preservedMeaning: true };

test("EXP-27 observes mediation when meaning is made accessible across a declared transformation", () => {
 const r = evaluateMediation(case1);
 assert.equal(r.experiment, "EXP-27");
 assert.equal(r.dimension, "mediation");
 assert.equal(r.status, "observed");
 assert.deepEqual([...r.transformations].sort(), ["complexity", "representation"]);
});

test("mediation can occur without language translation", () => {
 const r = evaluateMediation(case1);
 assert.equal('translation' in r, false);
 assert.equal(r.preservedMeaning, true);
});

test("records not-observed when meaning is not preserved or outcome fails", () => {
 assert.equal(evaluateMediation({ ...case1, preservedMeaning: false }).status, "not-observed");
 assert.equal(evaluateMediation({ ...case1, outcome: "failure" }).status, "not-observed");
});

test("requires an audience and an actual source-to-target transformation", () => {
 assert.throws(() => evaluateMediation({ ...case1, target: { representation: "spoken", complexity: "simplified" } }), /audience/i);
 assert.throws(() => evaluateMediation({ ...case1, target: { audience: "peer", representation: "written", complexity: "source" } }), /transformation/i);
});

test("does not infer global mediation competence or mastery", () => {
 const r = evaluateMediation(case1);
 assert.equal('competent' in r, false);
 assert.equal('mastered' in r, false);
});
