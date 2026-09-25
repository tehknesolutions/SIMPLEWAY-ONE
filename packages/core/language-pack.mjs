function fail(message) {
  throw new TypeError(`Invalid language pack: ${message}`);
}

export function validateLanguagePack(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if (typeof input.id !== "string" || !input.id.trim()) fail("id must be a non-empty string");
  if (!input.display || typeof input.display.name !== "string" || !input.display.name.trim()) fail("display.name must be a non-empty string");
  if (!Array.isArray(input.lessons)) fail("lessons must be an array");
  if (input.capabilities !== undefined && !Array.isArray(input.capabilities)) fail("capabilities must be an array when provided");
  for (const lesson of input.lessons) {
    if (!lesson || typeof lesson.id !== "string" || !lesson.id.trim()) fail("each lesson requires a non-empty id");
  }
  return Object.freeze({
    ...input,
    id: input.id.trim(),
    display: Object.freeze({ ...input.display, name: input.display.name.trim() }),
    capabilities: Object.freeze([...(input.capabilities ?? [])]),
    lessons: Object.freeze(input.lessons.map((lesson) => Object.freeze({ ...lesson })))
  });
}
