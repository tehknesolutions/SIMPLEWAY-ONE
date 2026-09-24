import { createEvidenceEvent } from './events.mjs';
const insufficient=reason=>Object.freeze({status:'INSUFFICIENT_EVIDENCE',reason});
export function evaluateAttempt({attempt,step,semanticContract}={}){
  if(attempt?.type!=='ATTEMPT')return insufficient('attempt event required');
  if(!step?.targetMicroCapabilityIds?.includes(attempt.targetMicroCapabilityId))return insufficient('attempt target not traced by step');
  const outcome=attempt.outcome??{}; if(outcome.kind!=='OBSERVATION')return insufficient('observable criterion-bound outcome required');
  const criteria=semanticContract?.evidenceCriteria??[]; if(!outcome.criterion||!criteria.includes(outcome.criterion))return insufficient('declared evidence criterion not observed');
  return createEvidenceEvent({id:`evidence:${attempt.id}`,missionId:attempt.missionId,stepId:attempt.stepId,targetMicroCapabilityId:attempt.targetMicroCapabilityId,at:attempt.at,criterion:outcome.criterion,observation:outcome.value,accepted:true});
}
