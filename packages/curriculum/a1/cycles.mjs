const IDS=['CONTACT','REFERENCE','ACTION','CONTEXT','INTERACTION','TRANSFER','AUTONOMY'];
export const A1_CYCLES=Object.freeze(IDS.map((id,index)=>Object.freeze({id,order:index+1})));
const CYCLE_SET=new Set(IDS);
const curriculumIds=curriculum=>new Set(curriculum.families.flatMap(f=>f.capabilities).flatMap(c=>c.microCapabilities).map(m=>m.id));

export function createCycleAssignment(input={}){
  if(!input.microCapabilityId) throw new TypeError('micro-capability id is required');
  if(!CYCLE_SET.has(input.cycleId)) throw new TypeError(`invalid cycle: ${input.cycleId}`);
  return Object.freeze({...input});
}

export function validateCycleAssignments(assignments=[],curriculum){
  const ids=curriculumIds(curriculum);
  for(const assignment of assignments){
    if(!ids.has(assignment.microCapabilityId)) throw new TypeError(`unknown micro-capability: ${assignment.microCapabilityId}`);
    if(!CYCLE_SET.has(assignment.cycleId)) throw new TypeError(`invalid cycle: ${assignment.cycleId}`);
  }
  return true;
}
