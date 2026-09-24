export function validateCampaignGraph(d={}){
 const nodes=d.nodes??[],ids=nodes.map(n=>n.id),known=new Set(ids);if(known.size!==ids.length)throw new TypeError('duplicate campaign node id');
 for(const e of d.edges??[]){if(!known.has(e.from)||!known.has(e.to))throw new TypeError('dangling campaign edge');if(e.from===e.to)throw new TypeError('self cycle forbidden');}
 for(const g of d.gates??[])if(!known.has(g.nodeId))throw new TypeError('dangling campaign gate node');
 const indegree=new Map(ids.map(id=>[id,0])),out=new Map(ids.map(id=>[id,[]]));for(const e of d.edges??[]){indegree.set(e.to,indegree.get(e.to)+1);out.get(e.from).push(e.to);}const order=[];let ready=ids.filter(id=>indegree.get(id)===0);
 while(ready.length){const id=ready.shift();order.push(id);for(const to of out.get(id)){indegree.set(to,indegree.get(to)-1);if(indegree.get(to)===0){ready.push(to);ready.sort((a,b)=>ids.indexOf(a)-ids.indexOf(b));}}}if(order.length!==ids.length)throw new TypeError('campaign graph cycle detected');return order;
}
