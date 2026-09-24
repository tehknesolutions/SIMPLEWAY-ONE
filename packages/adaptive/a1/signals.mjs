const freeze=v=>Object.freeze(v);
export function deriveAdaptiveSignal({target,policy,recentInsufficientAttempt=false,reviewDue=false}={}){
 if(!target||!policy)throw new TypeError('target and policy required');
 const state=target.progression;let signal=null,reason=null;
 if(state==='CHECKPOINTED'){if(reviewDue){signal='REVIEW';reason='EXPLICIT_REVIEW_DUE';}else return null;}
 else if(recentInsufficientAttempt&&target.attemptsSinceEvidence>0&&target.attemptsSinceEvidence<policy.retryLimit){signal='RETRY';reason='INSUFFICIENT_EVIDENCE_WITHIN_RETRY_BOUND';}
 else if(state==='UNSEEN'){signal='NEW';reason='TARGET_UNSEEN';}
 else if(state==='EXPOSED'){signal='REINFORCE';reason=target.attemptsSinceEvidence>=policy.retryLimit?'RETRY_BOUND_REACHED':'TARGET_EXPOSED';}
 else if(state==='EVIDENCED'){signal='ADVANCE';reason='ACCEPTED_EVIDENCE_WITHOUT_CHECKPOINT';}
 else throw new TypeError(`unknown progression state: ${state}`);
 return freeze({signal,reasonCodes:freeze([reason])});
}