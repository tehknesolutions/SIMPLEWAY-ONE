import { getLanguagePack } from '../language-packs/catalog.mjs';
import { createRepresentationBundle } from '../language-packs/representation-bundle.mjs';
import { createLanguagePackV2 } from '../language-packs/language-pack-v2.mjs';
import { compileCourse } from '../compiler/course-compiler.mjs';

const MICRO='a1.language.speak-hnk';
const graph=Object.freeze({id:'simpleway-a1-reference',domains:[{id:'communication',families:[{id:'language',capabilities:[{id:'speak-language',microCapabilities:[{id:MICRO,contract:{id:'ask-speak-language'},prerequisites:[]}]}]}]}]});
const levelProfile=Object.freeze({id:'A1',version:'1.0.0'});
const learningPath=Object.freeze({id:'standard',version:'1.0.0',capabilityIds:[MICRO]});
const activities=Object.freeze([{id:'recognize-text',version:'1.0.0',targetMicroCapabilities:[MICRO],stimulusModalities:['text'],responseModalities:['text'],evidenceTypes:['recognition'],evaluationPolicyId:'observe'}]);
const evaluationPolicies=Object.freeze([{id:'observe',version:'1.0.0',mode:'observational'}]);
const progressPolicy=Object.freeze({id:'a1-reference-progress',version:'1.0.0'});
const versionVector=Object.freeze({method:'1.0.0',curriculum:'1.0.0',levelProfile:'1.0.0',learningPath:'1.0.0',activities:'1.0.0',evaluation:'1.0.0',progress:'1.0.0',compiler:'1.0.0'});

export function createSyntheticRtlPack(){
  const provenance={source:'synthetic-e2e-fixture',authority:'VALIDATED'};
  const bundle=createRepresentationBundle({id:'rtl.fixture',primary:{value:'مثال',script:'Arab',direction:'rtl'},provenance});
  return createLanguagePackV2({id:'synthetic-rtl',version:'1.0.0',schemaVersion:'2',curriculumCompatibility:['simpleway-a1@1'],realizations:[{capabilityId:MICRO,status:'READY',bundle,provenance}]});
}

export function compileA1Reference(packOrId){
  const languagePack=typeof packOrId==='string'?getLanguagePack(packOrId):packOrId;
  if(!languagePack) throw new TypeError(`unknown language pack: ${packOrId}`);
  return compileCourse({graph,levelProfile,learningPath,languagePack,activities,evaluationPolicies,progressPolicy,versionVector:{...versionVector,languagePack:languagePack.version}});
}

export const A1_REFERENCE=Object.freeze({graph,levelProfile,learningPath,activities,evaluationPolicies,progressPolicy,versionVector});
