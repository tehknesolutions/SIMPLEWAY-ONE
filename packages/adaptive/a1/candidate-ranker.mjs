import {validateAdaptivePolicy} from './policy.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function rankAdaptiveCandidates({policy,candidates=[]}={}){
 validateAdaptivePolicy(policy);const priority=new Map(policy.signalPriority.map((s,i)=>[s,i]));
 const ranked=candidates.map(c=>({...c,rankingReasons:['READY_BEFORE_BLOCKED','SIGNAL_PRIORITY','STRUCTURAL_ORDER','TARGET_ID']}));
 ranked.sort((a,b)=>{const eligible=(a.eligibility==='READY'?0:1)-(b.eligibility==='READY'?0:1);if(eligible)return eligible;const signal=priority.get(a.signal)-priority.get(b.signal);if(signal)return signal;const structural=a.structuralOrder-b.structuralOrder;if(structural)return structural;return a.targetId.localeCompare(b.targetId);});
 return freeze(ranked);
}