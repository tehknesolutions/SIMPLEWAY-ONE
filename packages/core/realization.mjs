import { validateRepresentation } from "./representation.mjs";

function fail(message) { throw new TypeError(`Invalid realization: ${message}`); }

export function validateRealization(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if (typeof input.capabilityId !== "string" || !input.capabilityId.trim()) fail("capabilityId must be a non-empty string");
  if (typeof input.language !== "string" || !input.language.trim()) fail("language must be a non-empty string");
  if (!Array.isArray(input.representations)) fail("representations must be an array");
  return Object.freeze({
    ...input,
    capabilityId: input.capabilityId.trim(),
    language: input.language.trim(),
    representations: Object.freeze(input.representations.map(validateRepresentation))
  });
}
