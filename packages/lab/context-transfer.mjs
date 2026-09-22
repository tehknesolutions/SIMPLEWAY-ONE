function fail(message) { throw new TypeError(`Invalid context transfer comparison: ${message}`); }
function contextOf(event) {
 if (!event?.context || typeof event.context !== "object" || Array.isArray(event.context)) fail("each event requires a context object");
 return event.context;
}
export function evaluateContextTransfer({ baselineEvent, transferEvent }) {
 if (!baselineEvent || !transferEvent) fail("baselineEvent and transferEvent are required");
 if (baselineEvent.capabilityId !== transferEvent.capabilityId) fail("events must reference the same capability");
 const before = contextOf(baselineEvent);
 const after = contextOf(transferEvent);
 const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
 const changedDimensions = keys.filter((key) => before[key] !== after[key]);
 if (changedDimensions.length === 0) fail("transfer requires at least one context change");
 return Object.freeze({
   experiment: "EXP-23",
   dimension: "transfer",
   capabilityId: baselineEvent.capabilityId,
   baselineEventId: baselineEvent.id,
   transferEventId: transferEvent.id,
   changedDimensions: Object.freeze(changedDimensions),
   status: transferEvent.inference === "observed-success" ? "observed" : "not-observed"
 });
}
