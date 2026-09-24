import {createAdaptiveSnapshot} from './snapshot.mjs';import {generateAdaptiveCandidates} from './candidate-generator.mjs';import {evaluateAdaptiveEligibility} from './mission-eligibility.mjs';import {rankAdaptiveCandidates} from './candidate-ranker.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function selectNextMission(input={}){
 const snapshot=createAdaptiveSnapshot({targetIds:input.targetIds,events:input.events,asOf:input.asOf??null});
 const candidates=generateAdaptiveCandidates({semanticView:input.semanticView,snapshot,policy:input.policy,blueprint:input.blueprint,reviewDueTargetIds:input.reviewDueTargetIds,recentInsufficientTargetIds:input.recentInsufficientTargetIds});
 if(!candidates.length)return freeze({status:'CAMPAIGN_COMPLETE',snapshot});
 const gated=candidates.map(candidate=>evaluateAdaptiveEligibility({candidate,semanticView:input.semanticView,blueprint:input.blueprint,readinessCells:input.readinessCells,languagePack:input.languagePack,versionVector:input.versionVector}));const ranked=rankAdaptiveCandidates({policy:input.policy,candidates:gated});const selected=ranked.find(x=>x.eligibility==='READY');
 if(!selected)return freeze({status:'NO_ELIGIBLE_MISSION',blockedReasons:ranked.flatMap(x=>x.reasons??[]),snapshot});
 return freeze({status:'SELECTED',mission:selected.mission,trace:{targetId:selected.targetId,signal:selected.signal,reasonCodes:selected.reasonCodes,rankingReasons:selected.rankingReasons},snapshot});
}