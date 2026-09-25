import test from "node:test";
import assert from "node:assert/strict";
import { evaluateInteraction } from "../packages/lab/interaction.mjs";

const exchange = { capabilityId: "c1", turns: [{ actor: "learner", function: "initiate", outcome: "success" }, { actor: "partner", function: "respond" }, { actor: "learner", function: "respond", outcome: "success" }, { actor: "partner", function: "clarify" }, { actor: "learner", function: "adapt", outcome: "success" }] };

test("EXP-26 observes interaction across learner turns and functions", () => {
 const r = evaluateInteraction(exchange);
 assert.equal(r.experiment, "EXP-26");
 assert.equal(r.dimension, "interaction");
 assert.equal(r.status, "observed");
 assert.deepEqual(r.learnerFunctions, ["initiate", "respond", "adapt"]);
});

test("records not-observed when a learner interaction turn fails", () => {
 const turns = exchange.turns.map((t, i) => i === 4 ? { ...t, outcome: "failure" } : t);
 assert.equal(evaluateInteraction({ ...exchange, turns }).status, "not-observed");
});

test("requires multiple actors and at least two learner turns", () => {
 assert.throws(() => evaluateInteraction({ capabilityId: "c1", turns: [{ actor: "learner", function: "initiate", outcome: "success" }] }), /interaction/i);
 assert.throws(() => evaluateInteraction({ capabilityId: "c1", turns: [{ actor: "learner", function: "initiate", outcome: "success" }, { actor: "learner", function: "respond", outcome: "success" }, { actor: "learner", function: "adapt", outcome: "success" }] }), /actors/i);
});

test("does not infer fluency, mastery, or communicative competence globally", () => {
 const r = evaluateInteraction(exchange);
 for (const field of ["fluent", "mastered", "competent"]) assert.equal(field in r, false);
});
