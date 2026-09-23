import { validateSemanticContract } from './semantic-contract.mjs';

const duplicate=values=>new Set(values).size!==values.length;
export function validateA1SemanticCurriculum(dataset,structural){
  if(dataset.families.length!==structural.families.length) throw new TypeError('semantic family count mismatch');
  const familyIds=dataset.families.map(f=>f.familyId); if(duplicate(familyIds)) throw new TypeError('duplicate semantic family id');
  for(let i=0;i<structural.families.length;i++){
    const sf=structural.families[i], f=dataset.families[i]; if(f.familyId!==sf.id) throw new TypeError('semantic family id mismatch');
    if(f.capabilities.length!==sf.capabilities.length) throw new TypeError('semantic capability count mismatch');
    const capIds=f.capabilities.map(c=>c.id); if(duplicate(capIds)) throw new TypeError('duplicate semantic capability id');
    for(let j=0;j<sf.capabilities.length;j++){
      const sc=sf.capabilities[j], c=f.capabilities[j]; if(c.id!==sc.id) throw new TypeError('semantic capability id mismatch');
      if(typeof c.goal!=='string'||!c.goal.trim()) throw new TypeError('semantic capability goal required');
      if(c.contracts.length!==sc.microCapabilities.length) throw new TypeError('semantic micro count mismatch');
      const ids=c.contracts.map(x=>x.id); if(duplicate(ids)) throw new TypeError('duplicate semantic micro id');
      for(let k=0;k<ids.length;k++){if(ids[k]!==sc.microCapabilities[k].id) throw new TypeError('foreign or mismatched semantic micro id');validateSemanticContract(c.contracts[k].contract);}
    }
  }
  return true;
}
