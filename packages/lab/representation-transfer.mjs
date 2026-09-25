function fail(message) { throw new TypeError(`Invalid representation transfer comparison: ${message}`); }
function representationOf(event) {
 if (!event?.representation || typeof event.representation !== "object" || Array.isArray(event.representation)) fail("each event requires a representation object");
 return event.representation;
}
export function evaluateRepresentationTransfer({ baselineEvent, transferEvent }) {
 if (!baselineEvent || !transferEvent) fail("baselineEvent and transferEvent are required");
 if (baselineEvent.capabilityId !== transferEvent.capabilityId) fail("events must reference the same capability");
 const before = representationOf(baselineEvent);
 const after = representationOf(transferEvent);
 const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
 const changedDimensions = keys.filter((key) => before[key] !== after[key]);
 if (changedDimensions.length === 0) fail("transfer requires at least one representation change");
 return Object.freeze({
   experiment: "EXP-24",
   dimension: "representation-transfer",
   capabilityId: baselineEvent.capabilityId,
   baselineEventId: baselineEvent.id,
   transferEventId: transferEvent.id,
   changedDimensions: Object.freeze(changedDimensions),
   status: transferEvent.inference === "observed-success" ? "observed" : "not-observed"
 });
}
