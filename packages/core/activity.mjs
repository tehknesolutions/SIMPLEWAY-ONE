const LANGUAGE_SPECIFIC_FIELDS = new Set(["tense", "grammar", "wordOrder", "lexeme", "translation", "locale"]);
function fail(message) { throw new TypeError(`Invalid activity: ${message}`); }
export function validateActivity(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if (typeof input.id !== "string" || !input.id.trim()) fail("id must be a non-empty string");
  if (typeof input.capabilityId !== "string" || !input.capabilityId.trim()) fail("capabilityId must be a non-empty string");
  for (const field of LANGUAGE_SPECIFIC_FIELDS) if (field in input) fail(`language-specific field not allowed: ${field}`);
  return Object.freeze({ ...input, id: input.id.trim(), capabilityId: input.capabilityId.trim() });
}
