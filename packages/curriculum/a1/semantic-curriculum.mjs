import { A1_CURRICULUM } from './curriculum.mjs';
import F01 from './semantics/f01-identity-introduction.mjs'; import F02 from './semantics/f02-basic-social-interaction.mjs';
import F03 from './semantics/f03-existence-location.mjs'; import F04 from './semantics/f04-needs-wants-intention.mjs';
import F05 from './semantics/f05-actions-routine.mjs'; import F06 from './semantics/f06-people-objects-reference.mjs';
import F07 from './semantics/f07-quantity-basic-measure.mjs'; import F08 from './semantics/f08-time-sequence.mjs';
import F09 from './semantics/f09-space-direction-movement.mjs'; import F10 from './semantics/f10-description-basic-comparison.mjs';
import F11 from './semantics/f11-ability-permission-preference.mjs'; import F12 from './semantics/f12-repair-communicative-survival.mjs';

const CATALOGS=[F01,F02,F03,F04,F05,F06,F07,F08,F09,F10,F11,F12];
const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};

export function composeA1SemanticCurriculum(catalogs,structural=A1_CURRICULUM){
  const byFamily=new Map(catalogs.map(f=>[f.familyId,f]));
  const families=structural.families.map(sf=>{
    const source=byFamily.get(sf.id); if(!source) throw new TypeError(`missing semantic family ${sf.id}`);
    const byCap=new Map(source.capabilities.map(c=>[c.id,c]));
    return {familyId:sf.id,capabilities:sf.capabilities.map(sc=>{const c=byCap.get(sc.id);if(!c)throw new TypeError(`missing semantic capability ${sc.id}`);const byMicro=new Map(c.contracts.map(x=>[x.id,x]));return {id:sc.id,goal:c.goal,contracts:sc.microCapabilities.map(sm=>{const x=byMicro.get(sm.id);if(!x)throw new TypeError(`missing semantic micro ${sm.id}`);return x;})};})};
  });
  return freeze({version:'1.2.0',families});
}

export const A1_SEMANTIC_CURRICULUM=composeA1SemanticCurriculum(CATALOGS);
