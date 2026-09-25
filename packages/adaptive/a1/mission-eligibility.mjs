import {composeA1Mission} from '../../experience/a1/mission-composer.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function evaluateAdaptiveEligibility({candidate,...missionInput}={}){
 if(!candidate?.targetId)throw new TypeError('adaptive candidate target required');
 const result=composeA1Mission({...missionInput,targetMicroCapabilityIds:[candidate.targetId]});
 const trace={targetId:candidate.targetId,signal:candidate.signal,structuralOrder:candidate.structuralOrder,reasonCodes:[...(candidate.reasonCodes??[])]};
 if(result.status==='BLOCKED')return freeze({...trace,eligibility:'BLOCKED',selectable:false,reasons:[...result.reasons]});
 return freeze({...trace,eligibility:'READY',selectable:true,mission:result.mission});
}