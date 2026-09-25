function fail(message) { throw new TypeError(`Invalid evidence: ${message}`); }
export function validateEvidence(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if ("mastered" in input) fail("mastered is an inference, not evidence");
  for (const field of ["id", "activityId", "capabilityId", "kind"]) if (typeof input[field] !== "string" || !input[field].trim()) fail(`${field} must be a non-empty string`);
  if (!Array.isArray(input.evaluationLayers)) fail("evaluationLayers must be an array");
  return Object.freeze({ ...input, evaluationLayers: Object.freeze(input.evaluationLayers.map((layer) => Object.freeze({ ...layer }))) });
}
