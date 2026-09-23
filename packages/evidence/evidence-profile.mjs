const freeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) freeze(nested);
  return Object.freeze(value);
};

export function projectEvidence(events = []) {
  const history = [...events].sort((a,b) => a.at.localeCompare(b.at) || a.id.localeCompare(b.id));
  const byType = {};
  for (const item of history) byType[item.type] = (byType[item.type] ?? 0) + 1;
  return freeze({ eventCount:history.length, byType, history });
}
