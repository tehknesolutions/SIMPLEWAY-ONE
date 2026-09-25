function fail(message) { throw new TypeError(`Invalid progress event: ${message}`); }
export function validateProgressEvent(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if ("mastered" in input) fail("mastered boolean is not a universal progress model");
  for (const field of ["id", "capabilityId"]) if (typeof input[field] !== "string" || !input[field].trim()) fail(`${field} must be a non-empty string`);
  if (!Array.isArray(input.evidenceIds) || input.evidenceIds.length === 0) fail("evidenceIds must contain at least one evidence reference");
  if (input.evidenceIds.some((id) => typeof id !== "string" || !id.trim())) fail("evidenceIds must contain non-empty strings");
  return Object.freeze({ ...input, evidenceIds: Object.freeze([...input.evidenceIds]) });
}
