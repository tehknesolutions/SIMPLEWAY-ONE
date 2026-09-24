const AUTHORITY=new Set(['canonical','validated','mastered','authority']);
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const text=v=>typeof v==='string'&&v.trim().length>0;
const authorityFree=input=>{for(const key of Object.keys(input))if(AUTHORITY.has(key.toLowerCase()))throw new TypeError(`authority-bearing field forbidden: ${key}`);};
const base=input=>{authorityFree(input);for(const k of ['id','missionId','stepId','targetMicroCapabilityId','at'])if(!text(input[k]))throw new TypeError(`${k} required`);if(Number.isNaN(Date.parse(input.at)))throw new TypeError('valid timestamp required');};
export function createAttemptEvent(input={}){base(input);if(!input.outcome||!text(input.outcome.kind)||!text(input.outcome.value))throw new TypeError('observable outcome kind/value required');return freeze({type:'ATTEMPT',id:input.id,missionId:input.missionId,stepId:input.stepId,targetMicroCapabilityId:input.targetMicroCapabilityId,at:input.at,outcome:{...input.outcome}});}
export function createEvidenceEvent(input={}){base(input);if(!text(input.criterion)||!text(input.observation)||typeof input.accepted!=='boolean')throw new TypeError('evidence criterion, observation and accepted required');return freeze({type:'EVIDENCE',id:input.id,missionId:input.missionId,stepId:input.stepId,targetMicroCapabilityId:input.targetMicroCapabilityId,at:input.at,criterion:input.criterion,observation:input.observation,accepted:input.accepted});}
export function validateMissionEvent(event={},mission={}){
  if(event.missionId!==mission.id)throw new TypeError('event mission mismatch');
  const step=mission.steps?.find(s=>s.id===event.stepId);if(!step)throw new TypeError('unknown mission step');
  if(!step.targetMicroCapabilityIds?.includes(event.targetMicroCapabilityId))throw new TypeError('event target not traced by step');
  if(!['ATTEMPT','EVIDENCE','EXPOSURE','CHECKPOINT'].includes(event.type))throw new TypeError('unknown event type');
  return true;
}
