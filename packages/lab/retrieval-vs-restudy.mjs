function fail(message) { throw new TypeError(`Invalid EXP-25 comparison: ${message}`); }
function summarize(group, expected) {
 if (!group || group.condition !== expected) fail(`condition must be ${expected}`);
 if (!Array.isArray(group.observations) || group.observations.length === 0) fail(`observations for ${expected} must be non-empty`);
 let success = 0, failure = 0;
 for (const observation of group.observations) {
   if (observation?.outcome === "success") success++;
   else if (observation?.outcome === "failure") failure++;
   else fail(`observations require success/failure outcomes`);
 }
 return Object.freeze({ n: group.observations.length, counts: Object.freeze({ success, failure }), successRate: success / group.observations.length });
}
export function compareRetrievalVsRestudy({ retrieval, restudy, measure }) {
 if (!retrieval || !restudy) fail("retrieval and restudy groups are required");
 if (retrieval.capabilityId !== restudy.capabilityId) fail("groups must reference the same capability");
 if (typeof measure !== "string" || !measure.trim()) fail("measure is required");
 return Object.freeze({
   experiment: "EXP-25",
   capabilityId: retrieval.capabilityId,
   measure: measure.trim(),
   conditions: Object.freeze({ retrieval: summarize(retrieval, "retrieval"), restudy: summarize(restudy, "restudy") })
 });
}
