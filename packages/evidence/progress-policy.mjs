export function evaluateProgress(profile, policy = {}) {
  if (!policy.id || !policy.version) throw new TypeError('progress policy id and version are required');
  const required = policy.requireEvidenceTypes ?? [];
  const missing = required.filter((type) => !profile.byType[type]);
  const minimum = policy.minimumEvents ?? 0;
  const reasons = [];
  if (profile.eventCount < minimum) reasons.push(`requires ${minimum} events; observed ${profile.eventCount}`);
  if (missing.length) reasons.push(`missing evidence types: ${missing.join(', ')}`);
  if (!reasons.length) reasons.push(`policy ${policy.id}@${policy.version} requirements satisfied`);
  return Object.freeze({ decision:reasons.length === 1 && reasons[0].includes('requirements satisfied') ? 'ADVANCE' : 'HOLD', reasons:Object.freeze(reasons) });
}
