import { validateExperienceBlueprint } from './blueprint.mjs'; import { evaluateMissionGates } from './mission-gates.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const micros=view=>view.families.flatMap(f=>f.capabilities.flatMap(c=>c.microCapabilities));
export function composeA1Mission(input={}){
  validateExperienceBlueprint(input.blueprint); const nodes=micros(input.semanticView); const order=new Map(nodes.map((n,i)=>[n.id,i])); const requested=input.targetMicroCapabilityIds??[];
  if(new Set(requested).size!==requested.length) throw new TypeError('duplicate target id'); for(const id of requested) if(!order.has(id)) throw new TypeError(`unknown target: ${id}`);
  if(requested.length<input.blueprint.targetCount.min||requested.length>input.blueprint.targetCount.max) throw new TypeError('target count outside blueprint bounds');
  const targets=[...requested].sort((a,b)=>order.get(a)-order.get(b)); const realizations=input.languagePack?.realizations??[];
  const reasons=evaluateMissionGates({targets,blueprint:input.blueprint,readinessCells:input.readinessCells??[],realizations});
  if(reasons.length) return freeze({status:'BLOCKED',reasons});
  const byRealization=new Map(realizations.map(x=>[x.capabilityId,x])); const steps=input.blueprint.steps.map(step=>({id:step.id,role:step.role,targetMicroCapabilityIds:[...targets],realizations:targets.map(id=>byRealization.get(id))}));
  const mission={id:`${input.blueprint.id}:${targets.join('+')}`,version:input.blueprint.version,blueprintId:input.blueprint.id,status:'READY',targetMicroCapabilityIds:targets,steps,gates:[],provenance:{versionVector:{...(input.versionVector??{})}}};
  return freeze({status:'READY',mission:freeze(mission)});
}
