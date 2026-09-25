const freeze = (value) => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) value[key] = freeze(value[key]);
    return Object.freeze(value);
  }
  return value;
};

const microMap = (graph) => new Map(graph.domains.flatMap((domain) => domain.families)
  .flatMap((family) => family.capabilities)
  .flatMap((capability) => capability.microCapabilities)
  .map((micro) => [micro.id, micro]));

export function createLearningPath(input, graph) {
  if (!input?.id || !input?.version) throw new Error('learning path id and version are required');
  const byId = microMap(graph); const ordered = [...(input.capabilityIds ?? [])]; const seen = new Set();
  for (const id of ordered) {
    const node = byId.get(id);
    if (!node) throw new Error(`unknown capability: ${id}`);
    for (const prerequisite of node.prerequisites ?? []) if (!seen.has(prerequisite)) throw new Error(`prerequisite ${prerequisite} must precede ${id}`);
    seen.add(id);
  }
  return freeze({ id: input.id, version: input.version, capabilityIds: ordered });
}