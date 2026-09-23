const EFFECTS=new Set(['FACILITATES','INTERFERES','NO_TRANSFER','RECONCEPTUALIZATION']);
const need=(value,label)=>{if(value===undefined||value===null||value==='')throw new TypeError(`${label} is required`);return value;};
const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};

export function createTransferGraph(input={}) {
  need(input.id,'transfer graph id'); need(input.version,'version');
  if(!Array.isArray(input.edges)) throw new TypeError('edges are required');
  const edges=input.edges.map(item=>{
    need(item.id,'edge id'); need(item.from,'from reference'); need(item.to,'to reference'); need(item.evidence,'evidence');
    if(!EFFECTS.has(item.effect)) throw new TypeError(`invalid transfer effect: ${item.effect}`);
    if(item.authority && item.authority!=='HYPOTHESIS') throw new TypeError('automatic authority promotion is forbidden');
    return {...item,evidence:{...item.evidence},authority:'HYPOTHESIS'};
  });
  return freeze({...input,edges});
}
