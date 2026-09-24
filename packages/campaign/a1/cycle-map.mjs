export const A1_CAMPAIGN_CYCLES=Object.freeze(['CONTACT','REFERENCE','ACTION','CONTEXT','INTERACTION','TRANSFER','AUTONOMY']);
const ROLES=new Set(['INTRODUCE','REINFORCE','APPLY','CHECKPOINT','REVIEW']);
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const exactCycles=cycles=>Array.isArray(cycles)&&cycles.length===A1_CAMPAIGN_CYCLES.length&&cycles.every((x,i)=>x===A1_CAMPAIGN_CYCLES[i]);
export function validateCycleMap(map={}){
 if(typeof map.id!=='string'||!map.id||typeof map.version!=='string'||!map.version)throw new TypeError('cycle map id/version required');
 if(!exactCycles(map.cycles))throw new TypeError('exact campaign cycle order required');if(!Array.isArray(map.participations))throw new TypeError('participations required');
 const seen=new Set();for(const p of map.participations){if(typeof p.targetId!=='string'||!p.targetId)throw new TypeError('target id required');if(!A1_CAMPAIGN_CYCLES.includes(p.cycle))throw new TypeError('known cycle required');if(!ROLES.has(p.role))throw new TypeError('known participation role required');const key=`${p.targetId}\0${p.cycle}\0${p.role}`;if(seen.has(key))throw new TypeError('duplicate participation identity');seen.add(key);}return true;
}
export function createCycleMap(input={}){const map=structuredClone(input);validateCycleMap(map);return freeze(map);}
export function getParticipations(map,targetId){validateCycleMap(map);const participations=map.participations.filter(p=>p.targetId===targetId);if(!participations.length)return freeze({status:'UNRESOLVED',targetId,participations:[]});return freeze({status:'RESOLVED',targetId,participations:structuredClone(participations)});}
