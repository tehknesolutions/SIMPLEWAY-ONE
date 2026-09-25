const TYPES = new Set(['recognition','comprehension','recall','production','interaction','transfer','retention']);
const need = (value, label) => {
  if (value === undefined || value === null || value === '') throw new TypeError(`${label} is required`);
  return value;
};

export function createEvidenceEvent(input = {}) {
  need(input.id, 'event id'); need(input.learnerId, 'learner id'); need(input.capabilityId, 'capability id');
  need(input.activityId, 'activity id'); need(input.at, 'timestamp'); need(input.supportLevel, 'support level');
  need(input.modality, 'modality'); need(input.context, 'context');
  if (!TYPES.has(input.type)) throw new TypeError(`invalid evidence type: ${input.type}`);
  if (!Number.isInteger(input.attempts) || input.attempts < 1) throw new TypeError('attempts must be a positive integer');
  if (Number.isNaN(Date.parse(input.at))) throw new TypeError('timestamp must be ISO-compatible');
  return Object.freeze({ ...input });
}
