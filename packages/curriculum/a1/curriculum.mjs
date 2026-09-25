const CYCLES=['CONTACT','REFERENCE','ACTION','CONTEXT','INTERACTION','TRANSFER','AUTONOMY'];
const FAMILY_SPECS=[
  ['identity-introduction','Identity & Introduction',5],
  ['basic-social-interaction','Basic Social Interaction',4],
  ['existence-location','Existence & Location',4],
  ['needs-wants-intention','Needs, Wants & Intention',5],
  ['actions-routine','Actions & Routine',6],
  ['people-objects-reference','People, Objects & Reference',5],
  ['quantity-basic-measure','Quantity & Basic Measure',5],
  ['time-sequence','Time & Sequence',5],
  ['space-direction-movement','Space, Direction & Movement',5],
  ['description-basic-comparison','Description & Basic Comparison',5],
  ['ability-permission-preference','Ability, Permission & Preference',5],
  ['repair-communicative-survival','Repair & Communicative Survival',6]
];
const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};
const title=s=>s.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');

const families=FAMILY_SPECS.map(([slug,name,capabilityCount],familyIndex)=>{
  const capabilities=Array.from({length:capabilityCount},(_,capIndex)=>{
    const capNo=String(capIndex+1).padStart(2,'0'); const capId=`a1.${slug}.c${capNo}`;
    const microCapabilities=Array.from({length:3},(_,microIndex)=>{
      const microNo=String(microIndex+1).padStart(2,'0'); const id=`${capId}.m${microNo}`;
      return {id,contractId:`contract.${id}`,communicativeIntent:`${name}: capability ${capIndex+1}, communicative outcome ${microIndex+1}`};
    });
    return {id:capId,name:`${title(slug)} ${capIndex+1}`,microCapabilities};
  });
  return {id:`a1.family.${String(familyIndex+1).padStart(2,'0')}.${slug}`,name,capabilityCount,microCount:capabilityCount*3,capabilities};
});

export const A1_CURRICULUM=freeze({
  id:'simpleway-a1-universal', version:'1.1.0',
  cycles:CYCLES.map((id,index)=>({id,order:index+1})),
  families
});
