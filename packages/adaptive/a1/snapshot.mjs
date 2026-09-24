import {projectProgression} from '../../experience/a1/progression.mjs';
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
const timestamp=v=>typeof v==='string'&&!Number.isNaN(Date.parse(v));
export function createAdaptiveSnapshot({targetIds=[],events=[],asOf=null}={}){
 if(new Set(targetIds).size!==targetIds.length)throw new TypeError('duplicate target id');const known=new Set(targetIds);if(asOf!==null&&!timestamp(asOf))throw new TypeError('valid asOf timestamp required');
 for(const e of events){if(!known.has(e.targetMicroCapabilityId))throw new TypeError(`unknown target in event: ${e.targetMicroCapabilityId}`);if(e.at!==undefined&&!timestamp(e.at))throw new TypeError('valid event timestamp required');}
 const progression=projectProgression({targetIds,events}).targets;const targets={};
 for(const id of targetIds){let attemptsSinceEvidence=0,lastEventAt=null;for(const e of events){if(e.targetMicroCapabilityId!==id)continue;if(e.at)lastEventAt=e.at;if(e.type==='EVIDENCE'&&e.accepted===true)attemptsSinceEvidence=0;else if(e.type==='ATTEMPT')attemptsSinceEvidence++;}targets[id]={progression:progression[id],attemptsSinceEvidence,lastEventAt};}
 return freeze({asOf,targets});
}