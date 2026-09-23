function requiredText(value, field) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${field} is required`);
  return value;
}

function freezeList(value, field) {
  if (!Array.isArray(value)) throw new TypeError(`${field} must be an array`);
  return Object.freeze([...value]);
}

export function createSemanticPragmaticContract(input = {}) {
  return Object.freeze({
    id: requiredText(input.id, 'id'), intent: requiredText(input.intent, 'intent'),
    meaning: requiredText(input.meaning, 'meaning'), context: requiredText(input.context, 'context'),
    participants: freezeList(input.participants, 'participants'),
    register: requiredText(input.register, 'register'),
    pragmaticConstraints: freezeList(input.pragmaticConstraints, 'pragmaticConstraints'),
    evidenceExpectations: freezeList(input.evidenceExpectations, 'evidenceExpectations')
  });
}