export function evaluateReadiness(cell={},requirements={}){
  const reasons=[];
  if(cell.linguistic!=='READY') reasons.push(`linguistic gate is ${cell.linguistic??'UNRESOLVED'}`);
  for(const modality of requirements.representations??[]){
    if(cell.representation?.[modality]!=='READY') reasons.push(`representation gate for ${modality} is ${cell.representation?.[modality]??'UNRESOLVED'}`);
  }
  if(requirements.requiresPedagogy&&cell.pedagogical!=='READY') reasons.push(`pedagogical gate is ${cell.pedagogical??'UNRESOLVED'}`);
  if(requirements.requiresEvidence&&cell.evidence!=='READY') reasons.push(`evidence gate is ${cell.evidence??'UNRESOLVED'}`);
  return Object.freeze({eligible:reasons.length===0,reasons:Object.freeze(reasons)});
}
