import {deriveAdaptiveSignal} from './signals.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const nodes=view=>view.families.flatMap(f=>f.capabilities.flatMap(c=>c.microCapabilities));
export function generateAdaptiveCandidates({semanticView,snapshot,policy,blueprint,reviewDueTargetIds=[],recentInsufficientTargetIds=[]}={}){
 if(!blueprint?.targetCount||blueprint.targetCount.min<1||blueprint.targetCount.max<blueprint.targetCount.min)throw new TypeError('valid target bounds required');
 const all=nodes(semanticView);const ids=all.map(x=>x.id);if(new Set(ids).size!==ids.length)throw new TypeError('duplicate structural target id');const known=new Set(ids);for(const id of Object.keys(snapshot?.targets??{}))if(!known.has(id))throw new TypeError(`unknown snapshot target: ${id}`);
 const cycleOrder=new Map((semanticView.cycles??[]).map(c=>[c.id,c.order]));const cycleOf=n=>n.cycle??semanticView.cycles?.[0]?.id??'CONTACT';const incompleteCycles=all.filter(n=>snapshot.targets[n.id]?.progression!=='CHECKPOINTED').map(cycleOf);const currentOrder=Math.min(...incompleteCycles.map(c=>cycleOrder.get(c)??1));
 const due=new Set(reviewDueTargetIds),recent=new Set(recentInsufficientTargetIds);const out=[];
 for(let i=0;i<all.length;i++){const n=all[i],target=snapshot.targets[n.id];if(!target)continue;const cycle=cycleOf(n);if((cycleOrder.get(cycle)??1)>currentOrder)continue;const derived=deriveAdaptiveSignal({target,policy,reviewDue:due.has(n.id),recentInsufficientAttempt:recent.has(n.id)});if(!derived)continue;out.push({targetId:n.id,cycle,structuralOrder:i,signal:derived.signal,reasonCodes:derived.reasonCodes});}
 return freeze(out.slice(0,policy.candidateLimit));
}