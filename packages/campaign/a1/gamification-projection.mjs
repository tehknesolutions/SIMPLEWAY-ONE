const FORBIDDEN_POLICY_KEYS = new Set(['gateUnlocks','unlockGates','mutateEvidence','appendEvents','journalEvents','evidenceEvents']);
const isRecord = v => v !== null && typeof v === 'object' && !Array.isArray(v);

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const item of Object.values(value)) deepFreeze(item);
  return Object.freeze(value);
}

function validatePolicy(policy) {
  if (!isRecord(policy)) throw new TypeError('rewardPolicy must be an object');
  for (const key of Object.keys(policy)) if (FORBIDDEN_POLICY_KEYS.has(key)) throw new TypeError(`reward policy cannot claim authority over gate, journal, or evidence: ${key}`);
  if (!isRecord(policy.xpByEvent)) throw new TypeError('rewardPolicy xpByEvent must be an object');
  for (const [type,xp] of Object.entries(policy.xpByEvent)) {
    if (!type || !Number.isFinite(xp) || xp < 0) throw new TypeError('XP rewards must be finite nonnegative numbers');
  }
  if (policy.badges !== undefined && !Array.isArray(policy.badges)) throw new TypeError('badges must be an array');
  for (const badge of policy.badges ?? []) {
    if (!isRecord(badge) || typeof badge.id !== 'string' || !badge.id || typeof badge.eventType !== 'string' || !badge.eventType) throw new TypeError('badge rules require id and eventType');
  }
  if (policy.streakEventType !== undefined && (typeof policy.streakEventType !== 'string' || !policy.streakEventType)) throw new TypeError('streakEventType must be a string');
}

function validateJournal(journal) {
  if (!isRecord(journal) || !Array.isArray(journal.events)) throw new TypeError('journal with events is required');
  for (const event of journal.events) if (!isRecord(event) || typeof event.type !== 'string') throw new TypeError('journal events require type');
}
export function projectGamification({journal,rewardPolicy}={}) {
  validateJournal(journal); validatePolicy(rewardPolicy);
  let xp=0, streak=0;
  const earned=new Set();
  for (const event of journal.events) {
    xp += rewardPolicy.xpByEvent[event.type] ?? 0;
    if (rewardPolicy.streakEventType && event.type === rewardPolicy.streakEventType) streak++;
    for (const badge of rewardPolicy.badges ?? []) if (event.type === badge.eventType) earned.add(badge.id);
  }
  return deepFreeze({
    version:'1.5',
    campaignId:journal.campaignId ?? null,
    definitionVersion:journal.definitionVersion ?? null,
    rewardPolicyVersion:rewardPolicy.version ?? null,
    journalCursor:journal.events.length ? journal.events.at(-1).cursor ?? null : null,
    xp,
    streak,
    badges:[...earned].sort(),
  });
}
