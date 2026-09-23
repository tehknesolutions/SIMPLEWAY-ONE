const DIRECTIONS = new Set(['ltr', 'rtl']);
const need = (value, label) => {
  if (value === undefined || value === null || value === '') throw new TypeError(`${label} is required`);
  return value;
};
const freezeValue = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) freezeValue(nested);
  return Object.freeze(value);
};

export function createRepresentationBundle(input = {}) {
  need(input.id, 'bundle id');
  need(input.provenance, 'provenance');
  if (!input.primary) throw new TypeError('primary representation is required');
  need(input.primary.value, 'primary value');
  need(input.primary.script, 'script');
  if (!DIRECTIONS.has(input.primary.direction)) throw new TypeError(`invalid direction: ${input.primary.direction}`);
  const output = { ...input, primary: { ...input.primary }, provenance: { ...input.provenance } };
  return freezeValue(output);
}
