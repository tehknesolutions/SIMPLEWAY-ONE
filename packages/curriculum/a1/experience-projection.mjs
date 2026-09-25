const TYPES=new Set(['Mission','MicroLesson','Challenge','Review','Scenario','Checkpoint']);
export function projectA1Experiences(units=[],typeByCycle={}){
  const groups=new Map();
  for(const unit of units){
    if(!unit.eligible) continue; const type=typeByCycle[unit.cycleId]??'MicroLesson';
    if(!TYPES.has(type)) throw new TypeError(`invalid experience type: ${type}`);
    const key=`${unit.cycleId}:${type}`; if(!groups.has(key)) groups.set(key,{cycleId:unit.cycleId,type,ids:[]});
    const group=groups.get(key); if(!group.ids.includes(unit.microCapabilityId)) group.ids.push(unit.microCapabilityId);
  }
  return Object.freeze([...groups.values()].map((g,index)=>Object.freeze({id:`a1-exp-${String(index+1).padStart(3,'0')}`,cycleId:g.cycleId,type:g.type,microCapabilityIds:Object.freeze([...g.ids])})));
}
