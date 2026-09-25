const STATUSES = new Set(['READY', 'PARTIAL', 'UNRESOLVED', 'NOT_APPLICABLE']);
const need = (value, label) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) throw new TypeError(`${label} is required`);
  return value;
};
const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
};

export function createLanguagePackV2(input = {}) {
  need(input.id, 'pack id'); need(input.version, 'version'); need(input.schemaVersion, 'schema version');
  need(input.curriculumCompatibility, 'curriculum compatibility'); need(input.realizations, 'realizations');
  const realizations = input.realizations.map((item) => {
    need(item.capabilityId, 'capability id');
    if (!STATUSES.has(item.status)) throw new TypeError(`invalid realization status: ${item.status}`);
    if ((item.status === 'READY' || item.status === 'PARTIAL') && !item.bundle) throw new TypeError(`bundle is required for ${item.status}`);
    const provenance = item.provenance ?? item.bundle?.provenance;
    need(provenance, 'provenance');
    return { ...item, provenance };
  });
  return deepFreeze({ ...input, curriculumCompatibility:[...input.curriculumCompatibility], realizations });
}
