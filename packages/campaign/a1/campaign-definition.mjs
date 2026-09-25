import {getParticipations} from './cycle-map.mjs';import {validateCampaignGraph} from './graph-validator.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function createCampaignDefinition(input={}){
 if(typeof input.id!=='string'||!input.id||typeof input.version!=='string'||!input.version)throw new TypeError('campaign id/version required');if(!input.cycleMap)throw new TypeError('cycle map required');
 const nodes=structuredClone(input.nodes??[]);for(const n of nodes){const p=getParticipations(input.cycleMap,n.targetId);if(p.status==='UNRESOLVED')throw new TypeError(`unresolved cycle-map membership: ${n.targetId}`);if(!p.participations.some(x=>x.cycle===n.cycle&&x.role===n.role))throw new TypeError(`campaign node participation mismatch: ${n.id}`);}
 const draft={id:input.id,version:input.version,cycleMap:structuredClone(input.cycleMap),nodes,edges:structuredClone(input.edges??[]),gates:structuredClone(input.gates??[])};const topologicalOrder=validateCampaignGraph(draft);return freeze({...draft,topologicalOrder});
}
