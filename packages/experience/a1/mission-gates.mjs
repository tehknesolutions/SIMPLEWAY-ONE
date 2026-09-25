import { evaluateReadiness } from '../../curriculum/a1/readiness.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function evaluateMissionGates({targets,blueprint,readinessCells,realizations}){
  const cells=new Map(readinessCells.map(x=>[x.microCapabilityId,x])); const byRealization=new Map(realizations.map(x=>[x.capabilityId,x])); const reasons=[];
  for(const id of targets){const r=byRealization.get(id);if(!r||r.status==='UNRESOLVED'){reasons.push({code:'UNRESOLVED_REALIZATION',targetId:id});continue;}
    const cell=cells.get(id);if(!cell){reasons.push({code:'MISSING_READINESS',targetId:id});continue;}
    const gate=evaluateReadiness(cell,{representations:blueprint.requiredRepresentations,requiresPedagogy:true,requiresEvidence:true});for(const reason of gate.reasons)reasons.push({code:'READINESS_BLOCKED',targetId:id,reason});
  }
  return freeze(reasons);
}
