import { createHash } from 'node:crypto';

const NODE_STATES = new Set(['LOCKED','AVAILABLE','ACTIVE','EVIDENCED','CHECKPOINTED','REVIEW_DUE','BLOCKED']);
const isRecord = v => v !== null && typeof v === 'object' && !Array.isArray(v) && (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);
const requireString = (v, name) => { if (typeof v !== 'string' || !v) throw new TypeError(`${name} must be a non-empty string`); };
const requireStringArray = (v, name) => { if (!Array.isArray(v) || v.some(x => typeof x !== 'string')) throw new TypeError(`${name} must be an array of strings`); };

function canonicalize(value, stack = new Set()) {
  if (value === undefined) throw new TypeError('undefined is not canonical');
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') { if (!Number.isFinite(value)) throw new TypeError('number must be finite'); return Object.is(value,-0) ? 0 : value; }
  if (typeof value !== 'object') throw new TypeError(`unsupported canonical value: ${typeof value}`);
  if (stack.has(value)) throw new TypeError('cyclic object is not canonical');
  stack.add(value);
  try {
    if (Array.isArray(value)) {
      for (let i=0;i<value.length;i++) if (!Object.hasOwn(value,i)) throw new TypeError('sparse arrays are not canonical');
      return value.map(v => canonicalize(v, stack));
    }
    if (!isRecord(value)) throw new TypeError('canonical objects must be plain object records');
    if (Object.getOwnPropertySymbols(value).length) throw new TypeError('symbol keys are not canonical');
    const descriptors = Object.getOwnPropertyDescriptors(value);
    for (const [key,d] of Object.entries(descriptors)) {
      if (!d.enumerable) throw new TypeError(`non-enumerable property ${key} is not canonical`);
      if ('get' in d || 'set' in d) throw new TypeError(`accessor property ${key} is not canonical`);
    }
    const out = Object.create(null);
    for (const key of Object.keys(value).sort()) out[key] = canonicalize(value[key], stack);
    return out;
  } finally { stack.delete(value); }
}
function validateDefinition(d) {
  if (!isRecord(d)) throw new TypeError('definition must be a plain object');
  requireString(d.id,'definition id'); requireString(d.version,'definition version');
  if (!isRecord(d.cycleMap)) throw new TypeError('cycleMap must be an object');
  requireString(d.cycleMap.id,'cycleMap id'); requireString(d.cycleMap.version,'cycleMap version');
  for (const key of ['nodes','edges','gates','topologicalOrder']) if (!Array.isArray(d[key])) throw new TypeError(`${key} must be an array`);
  const ids = new Set();
  for (const n of d.nodes) {
    if (!isRecord(n)) throw new TypeError('node must be an object');
    for (const key of ['id','targetId','cycle','role']) requireString(n[key],`node ${key}`);
    if (ids.has(n.id)) throw new TypeError(`duplicate node id ${n.id}`); ids.add(n.id);
  }
  requireStringArray(d.topologicalOrder,'topologicalOrder');
  if (new Set(d.topologicalOrder).size !== d.topologicalOrder.length || d.topologicalOrder.length !== ids.size || d.topologicalOrder.some(id=>!ids.has(id))) throw new TypeError('topologicalOrder must contain every node exactly once');
}

function validateProjection(p) {
  if (!isRecord(p)) throw new TypeError('projection must be a plain object');
  requireString(p.campaignId,'campaignId'); requireString(p.definitionVersion,'definitionVersion'); requireString(p.asOf,'asOf');
  if (!isRecord(p.nodes)) throw new TypeError('nodes must be an object map');
  if (!isRecord(p.gates)) throw new TypeError('gates must be an object map');
  requireStringArray(p.availableTargetIds,'availableTargetIds');
  if (!Number.isFinite(p.journalCursor)) throw new TypeError('journal cursor must be finite');
  if (!Number.isInteger(p.journalCursor) || p.journalCursor < 0) throw new TypeError('journal cursor must be a nonnegative integer');
  for (const n of Object.values(p.nodes)) {
    if (!isRecord(n)) throw new TypeError('projection node must be an object');
    if (!NODE_STATES.has(n.state)) throw new TypeError(`invalid node state ${n.state}`);
    requireStringArray(n.eventIds,'eventIds'); requireStringArray(n.prerequisites,'prerequisites');
  }
}

function stringifyCanonical(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(stringifyCanonical).join(',') + ']';
  return '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + stringifyCanonical(value[k])).join(',') + '}';
}
const serialize = value => stringifyCanonical(canonicalize(value));
const sha256 = bytes => createHash('sha256').update(bytes,'utf8').digest('hex');
export function serializeCampaignDefinition(definition) { validateDefinition(definition); return serialize(definition); }
export function serializeCampaignProjection(projection) { validateProjection(projection); return serialize(projection); }
export function hashCampaignDefinition(definition) { return sha256(serializeCampaignDefinition(definition)); }
export function hashCampaignProjection(projection) { return sha256(serializeCampaignProjection(projection)); }
