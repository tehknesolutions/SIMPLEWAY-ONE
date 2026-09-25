import {createHash} from 'node:crypto';
const STATES=new Set(['SELECTED','NO_ELIGIBLE_MISSION','CAMPAIGN_COMPLETE']);
const canonical=v=>{if(Array.isArray(v))return v.map(canonical);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])]));return v;};
const validate=s=>{if(!s||typeof s!=='object')throw new TypeError('selection required');if(!STATES.has(s.status))throw new TypeError('valid selection status required');if(s.status==='SELECTED'&&!s.mission)throw new TypeError('SELECTED mission required');if(s.status==='NO_ELIGIBLE_MISSION'&&!Array.isArray(s.blockedReasons))throw new TypeError('blocked reasons required');return true;};
export function serializeAdaptiveSelection(selection){validate(selection);return JSON.stringify(canonical(selection));}
export function hashAdaptiveSelection(selection){return createHash('sha256').update(serializeAdaptiveSelection(selection),'utf8').digest('hex');}