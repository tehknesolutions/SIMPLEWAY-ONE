const ROLES=new Set(['MICRO_LESSON','SCENARIO','CHALLENGE','CHECKPOINT']);
const LITERAL=/EN ZAMI HNK KE|Do you speak HNK\?/i;
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const text=v=>typeof v==='string'&&v.trim().length>0;

export function validateExperienceBlueprint(b={}){
  if(!text(b.id)||!text(b.version)) throw new TypeError('blueprint id and version required');
  if(!b.targetCount||!Number.isInteger(b.targetCount.min)||!Number.isInteger(b.targetCount.max)||b.targetCount.min<1||b.targetCount.max<b.targetCount.min) throw new TypeError('valid targetCount required');
  if(!Array.isArray(b.requiredRepresentations)||!b.requiredRepresentations.length||b.requiredRepresentations.some(x=>!text(x))) throw new TypeError('required representation missing');
  if(!Array.isArray(b.evidenceRequirements)||!b.evidenceRequirements.length) throw new TypeError('evidence requirements required');
  if(!Array.isArray(b.steps)||!b.steps.length) throw new TypeError('steps required');
  const ids=b.steps.map(s=>s.id); if(new Set(ids).size!==ids.length) throw new TypeError('duplicate step id');
  for(const step of b.steps) if(!text(step.id)||!ROLES.has(step.role)) throw new TypeError('unknown step role');
  for(const role of ROLES) if(!b.steps.some(s=>s.role===role)) throw new TypeError(`${role} step required`);
  if(!text(b.retryPolicy)||!text(b.completionRule)) throw new TypeError('retryPolicy and completionRule required');
  if(LITERAL.test(JSON.stringify(b))) throw new TypeError('literal target-language surface forbidden in blueprint');
  return true;
}
export function createExperienceBlueprint(input={}){const b=structuredClone(input);validateExperienceBlueprint(b);return freeze(b);}
