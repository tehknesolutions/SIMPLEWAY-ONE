const STATUSES = new Set(["pass", "fail", "needs-review", "unresolved", "not-applicable"]);
function fail(message) { throw new TypeError(`Invalid evaluation: ${message}`); }
export function validateEvaluation(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("expected an object");
  if ("isCorrect" in input) fail("isCorrect is not a universal evaluation model");
  if (typeof input.activityId !== "string" || !input.activityId.trim()) fail("activityId must be a non-empty string");
  if (!Array.isArray(input.layers)) fail("layers must be an array");
  const layers = input.layers.map((layer) => {
    if (!layer || typeof layer.id !== "string" || !layer.id.trim()) fail("each layer requires an id");
    if (!STATUSES.has(layer.status)) fail(`unsupported layer status: ${layer.status}`);
    return Object.freeze({ ...layer });
  });
  return Object.freeze({ ...input, activityId: input.activityId.trim(), layers: Object.freeze(layers) });
}
