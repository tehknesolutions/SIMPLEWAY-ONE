import test from "node:test";
import assert from "node:assert/strict";
import { evaluateDelayedRetention } from "../packages/lab/delayed-retention.mjs";

const baseline = { id: "p1", capabilityId: "c1", observedAt: "2026-09-20T10:00:00Z", inference: "observed-success" };
const delayed = { id: "p2", capabilityId: "c1", observedAt: "2026-09-22T10:00:00Z", inference: "observed-success" };

test("records delayed retrieval as retention evidence when capability matches and time advances", () => {
 const r = evaluateDelayedRetention({ baselineEvent: baseline, delayedEvent: delayed });
 assert.equal(r.dimension, "retention");
 assert.equal(r.status, "observed");
 assert.equal(r.delayMs, 172800000);
});

test("does not infer retention when delayed observation failed", () => {
 const r = evaluateDelayedRetention({ baselineEvent: baseline, delayedEvent: { ...delayed, inference: "observed-failure" } });
 assert.equal(r.status, "not-observed");
});

test("rejects same-time, reversed-time, or cross-capability comparisons", () => {
 assert.throws(() => evaluateDelayedRetention({ baselineEvent: baseline, delayedEvent: { ...delayed, observedAt: baseline.observedAt } }), /later/i);
 assert.throws(() => evaluateDelayedRetention({ baselineEvent: baseline, delayedEvent: { ...delayed, capabilityId: "c2" } }), /capability/i);
});

test("does not define a universal minimum retention interval or mastery", () => {
 const r = evaluateDelayedRetention({ baselineEvent: baseline, delayedEvent: { ...delayed, observedAt: "2026-09-20T10:00:01Z" } });
 assert.equal(r.delayMs, 1000);
 assert.equal('mastered' in r, false);
 assert.equal('retentionThreshold' in r, false);
});
