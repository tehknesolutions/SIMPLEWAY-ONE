const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};

export function createA1SemanticView(structural,semantic){
  const familyMap=new Map(semantic.families.map(f=>[f.familyId,f]));
  const families=structural.families.map(family=>{
    const sf=familyMap.get(family.id); if(!sf) throw new TypeError(`missing semantic family ${family.id}`);
    const capMap=new Map(sf.capabilities.map(c=>[c.id,c]));
    return {...family,capabilities:family.capabilities.map(capability=>{
      const sc=capMap.get(capability.id); if(!sc) throw new TypeError(`missing semantic capability ${capability.id}`);
      const microMap=new Map(sc.contracts.map(x=>[x.id,x.contract]));
      return {...capability,semanticGoal:sc.goal,microCapabilities:capability.microCapabilities.map(micro=>{
        const contract=microMap.get(micro.id); if(!contract) throw new TypeError(`missing semantic micro ${micro.id}`);
        return {...micro,semanticContract:contract};
      })};
    })};
  });
  return freeze({...structural,semanticVersion:semantic.version,families});
}
