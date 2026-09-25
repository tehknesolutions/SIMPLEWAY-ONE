import test from "node:test";
import assert from "node:assert/strict";
import { evaluateSupportWithdrawal } from "../packages/lab/support-withdrawal.mjs";

const supported = { id: "p1", capabilityId: "c1", inference: "observed-success", supports: ["translation", "image"] };
const reduced = { id: "p2", capabilityId: "c1", inference: "observed-success", supports: ["image"] };

test("observes support withdrawal when success persists with a strict subset of supports", () => {
 const r = evaluateSupportWithdrawal({ baselineEvent: supported, withdrawalEvent: reduced });
 assert.equal(r.experiment, "EXP-22");
 assert.equal(r.dimension, "autonomy");
 assert.equal(r.status, "observed");
 assert.deepEqual(r.removedSupports, ["translation"]);
});

test("records not-observed when performance does not persist after support removal", () => {
 const r = evaluateSupportWithdrawal({ baselineEvent: supported, withdrawalEvent: { ...reduced, inference: "observed-failure" } });
 assert.equal(r.status, "not-observed");
});

test("requires actual support reduction and matching capability", () => {
 assert.throws(() => evaluateSupportWithdrawal({ baselineEvent: supported, withdrawalEvent: { ...reduced, supports: ["translation", "image"] } }), /removed/i);
 assert.throws(() => evaluateSupportWithdrawal({ baselineEvent: supported, withdrawalEvent: { ...reduced, capabilityId: "c2" } }), /capability/i);
});

test("does not equate reduced support with universal mastery or full autonomy", () => {
 const r = evaluateSupportWithdrawal({ baselineEvent: supported, withdrawalEvent: reduced });
 assert.equal('mastered' in r, false);
 assert.equal('autonomous' in r, false);
});
