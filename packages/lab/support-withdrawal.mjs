function fail(message) { throw new TypeError(`Invalid support withdrawal comparison: ${message}`); }
function uniqueSupports(event) {
 if (!Array.isArray(event?.supports)) fail("each event requires a supports array");
 return [...new Set(event.supports)];
}
export function evaluateSupportWithdrawal({ baselineEvent, withdrawalEvent }) {
 if (!baselineEvent || !withdrawalEvent) fail("baselineEvent and withdrawalEvent are required");
 if (baselineEvent.capabilityId !== withdrawalEvent.capabilityId) fail("events must reference the same capability");
 const before = uniqueSupports(baselineEvent);
 const after = uniqueSupports(withdrawalEvent);
 if (after.some((support) => !before.includes(support))) fail("withdrawal event cannot introduce new supports");
 const removedSupports = before.filter((support) => !after.includes(support));
 if (removedSupports.length === 0) fail("at least one support must be removed");
 return Object.freeze({
   experiment: "EXP-22",
   dimension: "autonomy",
   capabilityId: baselineEvent.capabilityId,
   baselineEventId: baselineEvent.id,
   withdrawalEventId: withdrawalEvent.id,
   removedSupports: Object.freeze(removedSupports),
   remainingSupports: Object.freeze(after),
   status: withdrawalEvent.inference === "observed-success" ? "observed" : "not-observed"
 });
}
