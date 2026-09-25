const freeze = (value) => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) value[key] = freeze(value[key]);
    return Object.freeze(value);
  }
  return value;
};

const microIds = (graph) => new Set(graph.domains.flatMap((domain) => domain.families)
  .flatMap((family) => family.capabilities)
  .flatMap((capability) => capability.microCapabilities)
  .map(({ id }) => id));

export function createLevelProfile(input, graph) {
  if (!input?.id || !input?.version) throw new Error('level profile id and version are required');
  const ids = microIds(graph);
  for (const id of input.capabilityIds ?? []) if (!ids.has(id)) throw new Error(`unknown capability: ${id}`);
  return freeze({
    id: input.id, version: input.version,
    capabilityIds: [...(input.capabilityIds ?? [])],
    expectations: { ...(input.expectations ?? {}) }
  });
}