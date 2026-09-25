import { evaluateAttempt } from './evidence-evaluator.mjs'; import { createFeedback } from './feedback.mjs'; import { projectProgression } from './progression.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function replayMission({mission,events=[]}={}){if(mission?.status!=='READY')throw new TypeError('READY mission required');return freeze({missionId:mission.id,eventCount:events.length,progression:projectProgression({targetIds:mission.targetMicroCapabilityIds,events})});}
export function runMissionStep({mission,event,semanticContracts={},events=[]}={}){
  if(mission?.status!=='READY')throw new TypeError('READY mission required');const step=mission.steps.find(s=>s.id===event?.stepId);if(!step)throw new TypeError('mission step required');
  if(event.type!=='ATTEMPT')return replayMission({mission,events:[...events,event]});
  const contract=semanticContracts[event.targetMicroCapabilityId];const evaluated=evaluateAttempt({attempt:event,step,semanticContract:contract});const evidence=evaluated?.type==='EVIDENCE'?evaluated:null;
  const feedback=createFeedback({attempt:event,evidence,semanticBoundary:contract?.depth?.boundary});const stream=[...events,event,...(evidence?[evidence]:[])];return freeze({missionId:mission.id,evidence,feedback,progression:projectProgression({targetIds:mission.targetMicroCapabilityIds,events:stream}),events:stream});
}
