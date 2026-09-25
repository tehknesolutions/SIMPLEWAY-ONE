import { A1_CURRICULUM } from './curriculum.mjs';
import { createEvidenceEnvelope } from '../../authority/evidence-envelope.mjs';

export const A1_EXISTING_TARGET=A1_CURRICULUM.families[11].capabilities[0].microCapabilities[0].id;
const history=Object.freeze([{at:'2026-09-23',action:'mapped-existing-v1-evidence'}]);
const envelopeFor=(pack,r)=>createEvidenceEnvelope({
  source:r.provenance?.source??'existing-language-pack',
  provenance:{languagePackId:pack.id,originalCapabilityId:r.capabilityId},
  authority:r.provenance?.authority??'UNRESOLVED', scope:A1_EXISTING_TARGET,
  validationHistory:history, version:pack.version
});

export function mapExistingRealizations(pack={}){
  const existing=pack.realizations??[];
  if(existing.length!==1) throw new TypeError('V1 existing mapping expects exactly one realization');
  const r=existing[0];
  const mapped={...r,capabilityId:A1_EXISTING_TARGET,evidenceEnvelope:envelopeFor(pack,r)};
  return Object.freeze({...pack,realizations:Object.freeze([Object.freeze(mapped)])});
}
