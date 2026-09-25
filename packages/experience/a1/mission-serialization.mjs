import crypto from 'node:crypto';
const canonical=value=>{if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;if(value&&typeof value==='object')return `{${Object.keys(value).sort().map(k=>`${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;return JSON.stringify(value);};
const validate=m=>{if(!m||m.status!=='READY')throw new TypeError('READY mission required');for(const key of ['id','version','blueprintId','targetMicroCapabilityIds','steps','gates','provenance'])if(m[key]===undefined)throw new TypeError(`mission ${key} required`);};
export function serializeMission(mission){validate(mission);return canonical(mission);}
export function hashMission(mission){return crypto.createHash('sha256').update(serializeMission(mission),'utf8').digest('hex');}
