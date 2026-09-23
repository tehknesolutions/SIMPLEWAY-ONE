const AUTHORITIES=new Set(['UNRESOLVED','CANDIDATE','VALIDATED','PEDAGOGICALLY_APPROVED','READY','CANONICAL','AI_GENERATED']);
const need=(value,label)=>{if(value===undefined||value===null||value===''||(Array.isArray(value)&&!value.length))throw new TypeError(`${label} is required`);return value;};
const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};

export function createEvidenceEnvelope(input={}){
  need(input.source,'source'); need(input.provenance,'provenance'); need(input.authority,'authority'); need(input.scope,'scope'); need(input.validationHistory,'validation history'); need(input.version,'version');
  if(!AUTHORITIES.has(input.authority)) throw new TypeError(`invalid authority: ${input.authority}`);
  if(input.evidenceStrength!==undefined&&(typeof input.evidenceStrength!=='number'||input.evidenceStrength<0||input.evidenceStrength>1)) throw new TypeError('evidence strength must be between 0 and 1');
  return freeze({...input,provenance:{...input.provenance},validationHistory:input.validationHistory.map(x=>({...x}))});
}
