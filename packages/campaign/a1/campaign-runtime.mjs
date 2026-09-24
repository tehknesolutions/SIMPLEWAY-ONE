import {projectCampaign} from './campaign-projection.mjs';
import {selectNextMission} from '../../adaptive/a1/adaptive-planner.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function resumeCampaign(input={}){
 const projection=projectCampaign({definition:input.definition,journal:input.journal,asOf:input.asOf});
 const planned=selectNextMission({...input,targetIds:projection.availableTargetIds,versionVector:{...input.versionVector,campaign:undefined}});
 const whyNodes=Object.fromEntries(input.definition.nodes.map(n=>[n.id,{state:projection.nodes[n.id].state,prerequisites:projection.nodes[n.id].prerequisites,eventIds:projection.nodes[n.id].eventIds}]));
 const versions={campaign:input.versionVector?.campaign??'1.5',definition:input.definition.version,cycleMap:input.definition.cycleMap.version,structural:input.versionVector?.structural,semantic:input.versionVector?.semantic,experience:input.versionVector?.experience,adaptive:input.versionVector?.adaptive};
 const why={nodes:whyNodes,gates:projection.gates,blockingReasons:planned.blockedReasons??[],adaptive:planned.trace?{signal:planned.trace.signal,reasonCodes:planned.trace.reasonCodes,rankingReasons:planned.trace.rankingReasons,targetId:planned.trace.targetId}:null,versions};
 return freeze({status:planned.status,projection,nextMission:planned.status==='SELECTED'?planned.mission:null,why});
}
