function fail(message) { throw new TypeError(`Invalid acquisition state: ${message}`); }
export function buildAcquisitionState({ capabilityId, progressEvents }) {
  if (typeof capabilityId !== "string" || !capabilityId.trim()) fail("capabilityId must be a non-empty string");
  if (!Array.isArray(progressEvents)) fail("progressEvents must be an array");
  for (const event of progressEvents) if (!event || event.capabilityId !== capabilityId) fail("all progress events must belong to the requested capability");
  const ordered = [...progressEvents].sort((a, b) => String(a.observedAt ?? "").localeCompare(String(b.observedAt ?? "")));
  const evidenceIds = [...new Set(ordered.flatMap((event) => event.evidenceIds ?? []))];
  const dimensionsObserved = [...new Set(ordered.flatMap((event) => event.dimensions ?? []))];
  return Object.freeze({
    capabilityId,
    status: ordered.length === 0 ? "unobserved" : "observed",
    observationCount: ordered.length,
    eventIds: Object.freeze(ordered.map((event) => event.id)),
    evidenceIds: Object.freeze(evidenceIds),
    dimensionsObserved: Object.freeze(dimensionsObserved),
    firstObservedAt: ordered[0]?.observedAt ?? null,
    lastObservedAt: ordered.at(-1)?.observedAt ?? null
  });
}
