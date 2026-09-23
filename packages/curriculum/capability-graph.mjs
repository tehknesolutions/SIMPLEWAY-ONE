const freeze = (items) => Object.freeze(items);
const need = (value, label) => { if (!value?.length) throw new TypeError(`${label} is required`); return value; };

export function createCapabilityGraph(input = {}) {
  need(input.id, 'graph id'); need(input.domains, 'domain');
  const ids = new Set(); const micros = [];
  const claim = (id) => { need(id, 'stable id'); if (ids.has(id)) throw new TypeError(`duplicate stable id: ${id}`); ids.add(id); };
  claim(input.id);
  const domains = input.domains.map((domain) => { claim(domain.id); need(domain.families, 'family');
    const families = domain.families.map((family) => { claim(family.id); need(family.capabilities, 'capability');
      const capabilities = family.capabilities.map((capability) => { claim(capability.id); need(capability.microCapabilities, 'micro-capability');
        const microCapabilities = capability.microCapabilities.map((micro) => {
          claim(micro.id); if (!micro.contract) throw new TypeError(`contract is required for ${micro.id}`);
          const value = Object.freeze({ id: micro.id, contract: micro.contract, prerequisites: freeze([...(micro.prerequisites ?? [])]) });
          micros.push(value); return value;
        });
        return Object.freeze({ id: capability.id, microCapabilities: freeze(microCapabilities) });
      });
      return Object.freeze({ id: family.id, capabilities: freeze(capabilities) });
    });
    return Object.freeze({ id: domain.id, families: freeze(families) });
  });
  const microIds = new Set(micros.map(({ id }) => id));
  for (const micro of micros) for (const prerequisite of micro.prerequisites) {
    if (!microIds.has(prerequisite)) throw new TypeError(`unknown prerequisite: ${prerequisite}`);
  }
  return Object.freeze({ id: input.id, domains: freeze(domains) });
}