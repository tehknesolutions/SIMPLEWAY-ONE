import test from "node:test";
import assert from "node:assert/strict";
import { createUniversalLearningCycle } from "../packages/method/universal-learning-cycle.mjs";

const capability = { id: "a1.identity.name", canDo: "identify oneself by name", level: "A1" };
const base = { capability, realization: { capabilityId: capability.id, language: "english", representations: [{ id: "en", value: "My name is Ana.", script: "Latn", direction: "ltr", role: "primary" }] } };

test("method orchestrator exposes the universal learning cycle in order", () => {
 const cycle = createUniversalLearningCycle(base);
 assert.deepEqual(cycle.stages.map(s => s.id), ["capability","encounter","comprehend","retrieve-produce","interact-mediate","reduce-support","transfer","revisit","record-evidence","update-acquisition-state"]);
});

test("same orchestrator accepts different languages without language branches", () => {
 for (const language of ["english","esperanto","hnk"]) {
   const realization = { capabilityId: capability.id, language, representations: language === "hnk" ? [] : base.realization.representations };
   assert.equal(createUniversalLearningCycle({ capability, realization }).language, language);
 }
});

test("method preserves unresolved HNK realization instead of inventing content", () => {
 const cycle = createUniversalLearningCycle({ capability, realization: { capabilityId: capability.id, language: "hnk", representations: [], authority: { status: "unresolved" } } });
 assert.equal(cycle.realization.representations.length, 0);
 assert.equal(cycle.realization.authority.status, "unresolved");
});

test("rejects mismatched capability linkage", () => {
 assert.throws(() => createUniversalLearningCycle({ capability, realization: { capabilityId: "other", language: "english", representations: [] } }), /capability/i);
});
