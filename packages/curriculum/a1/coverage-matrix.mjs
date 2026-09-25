const STATES=['READY','PARTIAL','UNRESOLVED','NOT_APPLICABLE'];
const count=values=>Object.fromEntries(STATES.map(s=>[s,values.filter(v=>v===s).length]));
const allMicros=curriculum=>curriculum.families.flatMap(f=>f.capabilities.flatMap(c=>c.microCapabilities.map(m=>({familyId:f.id,capabilityId:c.id,microCapabilityId:m.id}))));
const repState=(realization,key)=>realization?.bundle?.[key]?'READY':'UNRESOLVED';

export function buildCoverageMatrix(curriculum,pack={}){
  const byId=new Map((pack.realizations??[]).map(r=>[r.capabilityId,r]));
  const cells=allMicros(curriculum).map(ref=>{
    const r=byId.get(ref.microCapabilityId); const linguistic=r?.status??'UNRESOLVED';
    const text=r?.bundle?.primary?'READY':'UNRESOLVED'; const audio=repState(r,'audio');
    const activity=r?.activityStatus??'UNRESOLVED'; const evidence=r?.evidenceStatus??'UNRESOLVED';
    const compilation=linguistic==='READY'&&text==='READY'&&activity==='READY'&&evidence==='READY'?'READY':linguistic==='NOT_APPLICABLE'?'NOT_APPLICABLE':linguistic==='PARTIAL'?'PARTIAL':'UNRESOLVED';
    return Object.freeze({...ref,linguistic,representation:Object.freeze({text,audio}),activity,evidence,compilation});
  });
  return Object.freeze({packId:pack.id,packVersion:pack.version,cells:Object.freeze(cells)});
}

export function summarizeCoverage(matrix){
  return Object.freeze({
    linguistic:count(matrix.cells.map(c=>c.linguistic)),
    representation:Object.freeze({text:count(matrix.cells.map(c=>c.representation.text)),audio:count(matrix.cells.map(c=>c.representation.audio))}),
    activity:count(matrix.cells.map(c=>c.activity)),
    evidence:count(matrix.cells.map(c=>c.evidence)),
    compilation:count(matrix.cells.map(c=>c.compilation))
  });
}
