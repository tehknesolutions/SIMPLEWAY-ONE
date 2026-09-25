const TYPES=new Set(['PREREQUISITE','SUPPORTS','REINFORCES','CONTRASTS','TRANSFERS_TO','REVISITS']);
const freeze=value=>{if(!value||typeof value!=='object'||Object.isFrozen(value))return value;for(const nested of Object.values(value))freeze(nested);return Object.freeze(value);};
const microIds=curriculum=>new Set(curriculum.families.flatMap(f=>f.capabilities).flatMap(c=>c.microCapabilities).map(m=>m.id));

export function validatePrerequisiteDAG(graph){
  const edges=graph.edges.filter(e=>e.type==='PREREQUISITE'); const adjacency=new Map();
  for(const e of edges){if(!adjacency.has(e.from))adjacency.set(e.from,[]);adjacency.get(e.from).push(e.to);}
  const visiting=new Set(), visited=new Set();
  const visit=node=>{
    if(visiting.has(node)) throw new TypeError(`prerequisite cycle detected at ${node}`);
    if(visited.has(node)) return; visiting.add(node);
    for(const next of adjacency.get(node)??[]) visit(next);
    visiting.delete(node); visited.add(node);
  };
  for(const node of adjacency.keys()) visit(node); return true;
}

export function createA1DependencyGraph(edges=[],curriculum,options={}){
  const ids=microIds(curriculum); const edgeIds=new Set();
  const normalized=edges.map(item=>{
    if(!item.id) throw new TypeError('dependency edge id is required');
    if(edgeIds.has(item.id)) throw new TypeError(`duplicate dependency edge id: ${item.id}`); edgeIds.add(item.id);
    if(!ids.has(item.from)||!ids.has(item.to)) throw new TypeError(`unknown dependency node: ${!ids.has(item.from)?item.from:item.to}`);
    if(!TYPES.has(item.type)) throw new TypeError(`invalid dependency type: ${item.type}`);
    return {...item};
  });
  const graph=freeze({edges:normalized});
  if(options.validateDAG!==false) validatePrerequisiteDAG(graph);
  return graph;
}
