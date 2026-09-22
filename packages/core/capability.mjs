const LANGUAGE_SPECIFIC_FIELDS = new Set(["tense", "grammar", "wordOrder", "lexeme", "script", "translation"]);
function fail(message) { throw new TypeError(`Invalid capability: ${message}`); }
export function validateCapability(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if (typeof input.id !== "string" || !input.id.trim()) fail("id must be a non-empty string");
  if (typeof input.canDo !== "string" || !input.canDo.trim()) fail("canDo must be a non-empty string");
  for (const field of LANGUAGE_SPECIFIC_FIELDS) if (field in input) fail(`language-specific field not allowed: ${field}`);
  return Object.freeze({ ...input, id: input.id.trim(), canDo: input.canDo.trim() });
}
