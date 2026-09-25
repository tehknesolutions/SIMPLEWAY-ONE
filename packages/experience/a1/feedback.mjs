const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function createFeedback({attempt,evidence,semanticBoundary,correctionSurface,correctionEvidence}={}){
  if(attempt?.type!=='ATTEMPT')throw new TypeError('attempt required');
  if(correctionSurface&&!correctionEvidence)throw new TypeError('correction surface requires supplied correction evidence');
  const supported=evidence?.type==='EVIDENCE'&&evidence.accepted===true&&evidence.missionId===attempt.missionId&&evidence.stepId===attempt.stepId&&evidence.targetMicroCapabilityId===attempt.targetMicroCapabilityId;
  const feedback={kind:supported?'EVIDENCE_SUPPORTED':'INSUFFICIENT_EVIDENCE',observations:[supported?evidence.observation:attempt.outcome?.value].filter(Boolean),nextAction:supported?'CONTINUE':'RETRY',provenance:{attemptId:attempt.id,evidenceId:supported?evidence.id:null,semanticBoundary:semanticBoundary??null}};
  if(correctionSurface)feedback.correction={surface:correctionSurface,evidence:correctionEvidence}; return freeze(feedback);
}
