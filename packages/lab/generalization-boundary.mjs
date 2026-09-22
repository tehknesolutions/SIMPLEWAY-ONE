function fail(message) { throw new TypeError(`Invalid generalization boundary observation: ${message}`); }
export function evaluateGeneralizationBoundary({ capabilityId, cases }) {
 if (typeof capabilityId !== "string" || !capabilityId.trim()) fail("capabilityId is required");
 if (!Array.isArray(cases) || cases.length < 2) fail("multiple novel cases are required");
 const noveltyDimensions = new Set();
 const successfulCaseIds = [];
 const failedCaseIds = [];
 for (const item of cases) {
   if (!item || typeof item.id !== "string" || !item.id.trim()) fail("each case requires an id");
   if (!item.novelty || typeof item.novelty !== "object" || Array.isArray(item.novelty) || Object.keys(item.novelty).length === 0) fail("each case requires explicit novelty");
   Object.keys(item.novelty).forEach((key) => noveltyDimensions.add(key));
   if (item.outcome === "success") successfulCaseIds.push(item.id);
   else if (item.outcome === "failure") failedCaseIds.push(item.id);
   else fail("case outcome must be success or failure");
 }
 return Object.freeze({
   experiment: "EXP-28", dimension: "generalization", capabilityId: capabilityId.trim(),
   caseCount: cases.length, successCount: successfulCaseIds.length, failureCount: failedCaseIds.length,
   successfulCaseIds: Object.freeze(successfulCaseIds), failedCaseIds: Object.freeze(failedCaseIds),
   noveltyDimensions: Object.freeze([...noveltyDimensions])
 });
}
