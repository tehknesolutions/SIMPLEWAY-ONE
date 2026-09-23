import { createHash } from 'node:crypto';

const normalize = (value) => {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, normalize(value[key])]));
  return value;
};

export const canonicalJson = (value) => JSON.stringify(normalize(value));
export const sha256 = (text) => createHash('sha256').update(text).digest('hex');
