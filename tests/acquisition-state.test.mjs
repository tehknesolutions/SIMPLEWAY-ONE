import test from "node:test";
import assert from "node:assert/strict";
import { buildAcquisitionState } from "../packages/core/acquisition-state.mjs";

const events = [
 { id: "p1", capabilityId: "a1.identity.name", evidenceIds: ["e1"], inference: "observed-success", scope: "single-activity", observedAt: "2026-09-20T10:00:00Z", dimensions: ["retrieval"] },
 { id: "p2", capabilityId: "a1.identity.name", evidenceIds: ["e2"], inference: "observed-success", scope: "new-context", observedAt: "2026-09-22T10:00:00Z", dimensions: ["transfer"] }
];

test("acquisition state aggregates longitudinal evidence without declaring mastery", () => {
 const s = buildAcquisitionState({ capabilityId: "a1.identity.name", progressEvents: events });
 assert.equal(s.observationCount, 2);
 assert.deepEqual(s.dimensionsObserved, ["retrieval", "transfer"]);
 assert.equal('mastered' in s, false);
});

test("acquisition state preserves event chronology and evidence traceability", () => {
 const s = buildAcquisitionState({ capabilityId: "a1.identity.name", progressEvents: [...events].reverse() });
 assert.deepEqual(s.eventIds, ["p1", "p2"]);
 assert.deepEqual(s.evidenceIds, ["e1", "e2"]);
});

test("events for another capability are rejected rather than silently mixed", () => {
 assert.throws(() => buildAcquisitionState({ capabilityId: "c1", progressEvents: [{ ...events[0], capabilityId: "c2" }] }), /capability/i);
});

test("empty history is a valid unobserved state", () => {
 const s = buildAcquisitionState({ capabilityId: "c", progressEvents: [] });
 assert.equal(s.observationCount, 0);
 assert.equal(s.status, "unobserved");
});
