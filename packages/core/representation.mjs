const DIRECTIONS = new Set(["ltr", "rtl", "auto"]);
const ROLES = new Set(["primary", "support", "alternate", "transliteration", "gloss"]);
function fail(message) { throw new TypeError(`Invalid representation: ${message}`); }
export function validateRepresentation(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if (typeof input.id !== "string" || !input.id.trim()) fail("id must be a non-empty string");
  if (typeof input.value !== "string" || !input.value.trim()) fail("value must be a non-empty string");
  if (input.direction !== undefined && !DIRECTIONS.has(input.direction)) fail("direction must be ltr, rtl, or auto");
  if (input.role !== undefined && !ROLES.has(input.role)) fail("role is not supported");
  if (input.script !== undefined && (typeof input.script !== "string" || !input.script.trim())) fail("script must be a non-empty string when provided");
  return Object.freeze({ ...input, id: input.id.trim(), value: input.value, direction: input.direction ?? "auto", role: input.role ?? "primary" });
}
