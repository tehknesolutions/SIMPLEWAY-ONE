const freeze=v=>{if(!v||typeof v!=='object'||Object.isFrozen(v))return v;for(const x of Object.values(v))freeze(x);return Object.freeze(v);};
export function projectProgression({targetIds=[],events=[]}={}){
  const targets=Object.fromEntries(targetIds.map(id=>[id,'UNSEEN']));
  for(const event of events){const id=event.targetMicroCapabilityId;if(!(id in targets))continue;const state=targets[id];
    if(event.type==='EXPOSURE'&&state==='UNSEEN')targets[id]='EXPOSED';
    else if(event.type==='EVIDENCE'&&event.accepted===true&&state!=='CHECKPOINTED')targets[id]='EVIDENCED';
    else if(event.type==='CHECKPOINT'&&event.accepted===true&&state==='EVIDENCED')targets[id]='CHECKPOINTED';
  }
  return freeze({targets});
}
