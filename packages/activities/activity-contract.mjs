const need = (value, label) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) throw new TypeError(`${label} is required`);
  return value;
};
const freeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) freeze(nested);
  return Object.freeze(value);
};
const forbidVerdicts = (input) => {
  if ('mastered' in input) throw new TypeError('mastered is not a universal activity field');
  if ('isCorrect' in input) throw new TypeError('isCorrect is not a universal activity field');
};

export function createActivityContract(input = {}) {
  forbidVerdicts(input);
  need(input.id, 'activity id'); need(input.version, 'version');
  need(input.targetMicroCapabilities, 'target micro-capabilities');
  need(input.stimulusModalities, 'stimulus modalities'); need(input.responseModalities, 'response modalities');
  need(input.evidenceTypes, 'evidence types'); need(input.evaluationPolicyId, 'evaluation policy id');
  return freeze({ ...input, targetMicroCapabilities:[...input.targetMicroCapabilities], stimulusModalities:[...input.stimulusModalities], responseModalities:[...input.responseModalities], supports:[...(input.supports ?? [])], evidenceTypes:[...input.evidenceTypes], rendererHints:[...(input.rendererHints ?? [])] });
}
