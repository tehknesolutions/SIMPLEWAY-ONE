const MODES = new Set(['exact','set','normalized','structural','semantic','human','ai-assisted','observational']);
const need = (value, label) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) throw new TypeError(`${label} is required`);
  return value;
};
const freeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) freeze(nested);
  return Object.freeze(value);
};

export function createEvaluationPolicy(input = {}) {
  if ('mastered' in input) throw new TypeError('mastered is not a universal evaluation field');
  if ('isCorrect' in input) throw new TypeError('isCorrect is not a universal evaluation field');
  need(input.id, 'policy id'); need(input.version, 'version'); need(input.evidenceTypes, 'evidence types');
  if (!MODES.has(input.mode)) throw new TypeError(`invalid evaluation mode: ${input.mode}`);
  return freeze({ ...input, evidenceTypes:[...input.evidenceTypes] });
}
