const EXPECTED_CAPS=[5,4,4,5,6,5,5,5,5,5,5,6];
const need=(value,label)=>{if(value===undefined||value===null||value==='')throw new TypeError(`${label} is required`);return value;};

export function validateA1Curriculum(curriculum={}) {
  if(!Array.isArray(curriculum.families)||curriculum.families.length!==12) throw new TypeError('A1 requires exactly 12 families');
  if(!Array.isArray(curriculum.cycles)||curriculum.cycles.length!==7) throw new TypeError('A1 requires exactly 7 cycles');
  const ids=[]; let capabilityTotal=0; let microTotal=0;
  curriculum.families.forEach((family,index)=>{
    need(family.id,'family id'); ids.push(family.id);
    if(!Array.isArray(family.capabilities)||family.capabilities.length!==EXPECTED_CAPS[index]) throw new TypeError(`family ${index+1} capability count is invalid`);
    if(family.capabilityCount!==EXPECTED_CAPS[index]||family.microCount!==EXPECTED_CAPS[index]*3) throw new TypeError(`family ${index+1} declared mathematics is invalid`);
    capabilityTotal+=family.capabilities.length;
    for(const capability of family.capabilities){
      need(capability.id,'capability id'); ids.push(capability.id);
      if(!Array.isArray(capability.microCapabilities)||capability.microCapabilities.length!==3) throw new TypeError('each capability requires exactly 3 micro-capabilities');
      for(const micro of capability.microCapabilities){
        need(micro.id,'micro-capability id'); need(micro.contractId,'semantic-pragmatic contract'); need(micro.communicativeIntent,'communicative intent'); ids.push(micro.id); microTotal++;
      }
    }
  });
  if(capabilityTotal!==60) throw new TypeError(`A1 requires exactly 60 capabilities; observed ${capabilityTotal}`);
  if(microTotal!==180) throw new TypeError(`A1 requires exactly 180 micro-capabilities; observed ${microTotal}`);
  if(new Set(ids).size!==ids.length) throw new TypeError('duplicate curriculum id detected');
  return true;
}
