import { canonicalJson, sha256 } from './canonical-json.mjs';

const freeze = value => { if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value; for (const nested of Object.values(value)) freeze(nested); return Object.freeze(value); };
const micros = graph => graph.domains.flatMap(d=>d.families).flatMap(f=>f.capabilities).flatMap(c=>c.microCapabilities);
const modalities = bundle => new Set(['text', ...(bundle?.audio?['audio']:[]), ...(bundle?.glyph?['glyph']:[]), ...(bundle?.image?['image']:[])]);
const eligible = (activity, available) => activity.stimulusModalities.every(modality => available.has(modality));

export function compileCourse(input = {}) {
  const byMicro = new Map(micros(input.graph).map(node=>[node.id,node]));
  const byRealization = new Map(input.languagePack.realizations.map(item=>[item.capabilityId,item]));
  const units=[]; const gaps=[];
  for (const id of input.learningPath.capabilityIds) {
    if (!byMicro.has(id)) throw new TypeError(`unknown path capability: ${id}`);
    const realization=byRealization.get(id); if (!realization) throw new TypeError(`missing realization: ${id}`);
    if (realization.status==='UNRESOLVED') { units.push({capabilityId:id,status:'UNRESOLVED',activities:[]}); gaps.push({capabilityId:id,reason:'UNRESOLVED'}); continue; }
    if (realization.status==='NOT_APPLICABLE') { units.push({capabilityId:id,status:'NOT_APPLICABLE',action:input.notApplicablePolicy??'HOLD',activities:[]}); continue; }
    const available=modalities(realization.bundle);
    const activities=input.activities.filter(activity=>activity.targetMicroCapabilities.includes(id) && eligible(activity,available));
    units.push({capabilityId:id,status:realization.status,bundle:realization.bundle,activities});
  }
  const manifest=freeze({schemaVersion:'1',graphId:input.graph.id,levelProfile:{id:input.levelProfile.id,version:input.levelProfile.version},learningPath:{id:input.learningPath.id,version:input.learningPath.version},languagePack:{id:input.languagePack.id,version:input.languagePack.version},versionVector:{...input.versionVector},units,gaps});
  const canonical=canonicalJson(manifest); return freeze({manifest,canonical,hash:sha256(canonical)});
}
