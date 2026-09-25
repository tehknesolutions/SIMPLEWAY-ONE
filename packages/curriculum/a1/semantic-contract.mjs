const FIELDS=['intent','interactionRole','semanticScope','pragmaticConditions','evidenceCriteria','exclusions'];
const LIST_FIELDS=new Set(['semanticScope','pragmaticConditions','evidenceCriteria','exclusions']);
const PRESCRIPTIONS=[/word order/i,/mandatory pronoun/i,/present simple/i,/\bcopula\b/i,/\barticle\b/i,/grammatical case/i,/gender agreement/i];
const PLACEHOLDERS=[/capability\s+\d+/i,/communicative outcome\s+\d+/i];

const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};
const present=value=>typeof value==='string'&&value.trim().length>0;

export function validateSemanticContract(contract={}){
  for(const field of FIELDS){
    const value=contract[field];
    if(value===undefined||value===null) throw new TypeError(`${field} is required`);
    if(LIST_FIELDS.has(field)&&(!Array.isArray(value)||value.length===0||value.some(item=>!present(item)))) throw new TypeError(`${field} requires non-empty evidence/exclusion semantic entries`);
    if(!LIST_FIELDS.has(field)&&!present(value)) throw new TypeError(`${field} is required`);
  }
  if(!contract.depth||!present(contract.depth.core)||!present(contract.depth.context)||!present(contract.depth.boundary)) throw new TypeError('semantic depth requires core, context and boundary');
  const text=JSON.stringify(contract);
  if(PLACEHOLDERS.some(pattern=>pattern.test(text))) throw new TypeError('semantic placeholder is forbidden');
  if(PRESCRIPTIONS.some(pattern=>pattern.test(text))) throw new TypeError('language-specific grammar prescription is forbidden');
  return true;
}

export function createSemanticContract(input={}){
  const contract={...input,semanticScope:[...(input.semanticScope??[])],pragmaticConditions:[...(input.pragmaticConditions??[])],evidenceCriteria:[...(input.evidenceCriteria??[])],exclusions:[...(input.exclusions??[])],depth:{...(input.depth??{})}};
  validateSemanticContract(contract); return freeze(contract);
}
