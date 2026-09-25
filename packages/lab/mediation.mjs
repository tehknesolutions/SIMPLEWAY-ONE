function fail(message) { throw new TypeError(`Invalid mediation observation: ${message}`); }
export function evaluateMediation({ capabilityId, source, target, outcome, preservedMeaning }) {
 if (typeof capabilityId !== "string" || !capabilityId.trim()) fail("capabilityId is required");
 if (!source || typeof source !== "object") fail("source is required");
 if (!target || typeof target !== "object") fail("target is required");
 if (typeof target.audience !== "string" || !target.audience.trim()) fail("target audience is required");
 const keys = [...new Set([...Object.keys(source), ...Object.keys(target)])].filter((key) => !["id", "audience"].includes(key));
 const transformations = keys.filter((key) => source[key] !== target[key]);
 if (transformations.length === 0) fail("mediation requires a source-to-target transformation");
 return Object.freeze({
   experiment: "EXP-27",
   dimension: "mediation",
   capabilityId: capabilityId.trim(),
   audience: target.audience.trim(),
   transformations: Object.freeze(transformations),
   preservedMeaning: preservedMeaning === true,
   status: outcome === "success" && preservedMeaning === true ? "observed" : "not-observed"
 });
}
