function fail(message) { throw new TypeError(`Invalid delayed retention comparison: ${message}`); }
export function evaluateDelayedRetention({ baselineEvent, delayedEvent }) {
 if (!baselineEvent || !delayedEvent) fail("baselineEvent and delayedEvent are required");
 if (baselineEvent.capabilityId !== delayedEvent.capabilityId) fail("events must reference the same capability");
 const start = Date.parse(baselineEvent.observedAt);
 const end = Date.parse(delayedEvent.observedAt);
 if (!Number.isFinite(start) || !Number.isFinite(end)) fail("events require valid observedAt timestamps");
 if (end <= start) fail("delayedEvent must be later than baselineEvent");
 return Object.freeze({
   experiment: "EXP-21",
   dimension: "retention",
   capabilityId: baselineEvent.capabilityId,
   baselineEventId: baselineEvent.id,
   delayedEventId: delayedEvent.id,
   delayMs: end - start,
   status: delayedEvent.inference === "observed-success" ? "observed" : "not-observed"
 });
}
