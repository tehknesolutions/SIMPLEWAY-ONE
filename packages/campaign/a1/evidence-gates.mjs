const SOURCES={ACCEPTED_EVIDENCE:['acceptedEvidence','REQUIRED_ACCEPTED_EVIDENCE_MISSING'],CHECKPOINT:['checkpoints','REQUIRED_CHECKPOINT_MISSING'],APPLY:['applied','REQUIRED_APPLY_MISSING']};
const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function evaluateEvidenceGate({gate,journalProjection}={}){
 if(!gate||!Array.isArray(gate.requirements))throw new TypeError('gate requirements required');if(!journalProjection||typeof journalProjection!=='object')throw new TypeError('journal projection required');
 const requirements=gate.requirements.map(req=>{const source=SOURCES[req.kind];if(!source)throw new TypeError(`unsupported evidence requirement: ${req.kind}`);if(typeof req.targetId!=='string'||!req.targetId)throw new TypeError('requirement target id required');const eventIds=[...(journalProjection[source[0]]?.[req.targetId]??[])];return {kind:req.kind,targetId:req.targetId,satisfied:eventIds.length>0,eventIds,reasonCodes:eventIds.length?[]:[source[1]]};});
 return freeze({status:requirements.every(x=>x.satisfied)?'SATISFIED':'UNSATISFIED',requirements});
}
