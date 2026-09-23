const TYPES=new Set(['EQUIVALENT','ANALOGOUS','NON_EQUIVALENT','UNIQUE']);
const need=(value,label)=>{if(value===undefined||value===null||value==='')throw new TypeError(`${label} is required`);return value;};
const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};

export function createComparativeMatrix(input={}) {
  need(input.id,'matrix id'); need(input.version,'version');
  if(!Array.isArray(input.relations)) throw new TypeError('relations are required');
  const relations=input.relations.map(item=>{
    need(item.id,'relation id'); need(item.left,'left reference'); need(item.evidence,'evidence');
    if(!TYPES.has(item.type)) throw new TypeError(`invalid relation type: ${item.type}`);
    if(item.type!=='UNIQUE') need(item.right,'right reference');
    return {...item,evidence:{...item.evidence}};
  });
  return freeze({...input,relations});
}
