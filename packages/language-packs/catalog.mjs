import { createUniversalMicroLesson } from "../method/universal-microlesson.mjs";
import { createRepresentationBundle } from "./representation-bundle.mjs";
import { createLanguagePackV2 } from "./language-pack-v2.mjs";

const capability = Object.freeze({ id:"a1.language.speak-hnk", canDo:"ask whether someone speaks HNK", level:"A1" });
const provenance = (source, authority) => Object.freeze({ source, authority });
const bundle = (id, value, source, authority) => createRepresentationBundle({
  id, primary:{ value, script:"Latn", direction:"ltr" }, provenance:provenance(source, authority)
});
const legacyRealizations = Object.freeze({
  english:Object.freeze({ capabilityId:capability.id, language:"english", representations:Object.freeze([Object.freeze({id:"en",value:"Do you speak HNK?",script:"Latn",direction:"ltr",role:"primary"})]) }),
  hnk:Object.freeze({ capabilityId:capability.id, language:"hnk", representations:Object.freeze([Object.freeze({id:"hnk",value:"EN ZAMI HNK KE",script:"Latn",direction:"ltr",role:"primary"})]), authority:Object.freeze({status:"confirmed-project-canon"}) }),
  esperanto:Object.freeze({ capabilityId:capability.id, language:"esperanto", representations:Object.freeze([]), authority:Object.freeze({status:"unresolved"}) })
});

function makePack(id, label, legacy, realization) {
  const microLesson = createUniversalMicroLesson({ id:"ml-a1-speak-hnk", capability, realization:legacy });
  const v2 = createLanguagePackV2({ id, label, version:"1.0.0", schemaVersion:"2", curriculumCompatibility:["simpleway-a1@1"], realizations:[realization] });
  return Object.freeze({ ...v2, status:microLesson.status, level:"A1", microLessons:Object.freeze([microLesson]) });
}

const registry = Object.freeze([
  makePack("english", "English", legacyRealizations.english, { capabilityId:capability.id, status:"READY", bundle:bundle("en.speak-hnk","Do you speak HNK?","simpleway-existing","VALIDATED"), provenance:provenance("simpleway-existing","VALIDATED") }),
  makePack("hnk", "HNK", legacyRealizations.hnk, { capabilityId:capability.id, status:"READY", bundle:bundle("hnk.speak-hnk","EN ZAMI HNK KE","hnk-project-canon","CANONICAL"), provenance:provenance("hnk-project-canon","CANONICAL") }),
  makePack("esperanto", "Esperanto", legacyRealizations.esperanto, { capabilityId:capability.id, status:"UNRESOLVED", provenance:provenance("simpleway-gap","UNRESOLVED") })
]);

export function listLanguagePacks() {
  return Object.freeze([...registry]);
}

export function getLanguagePack(id) {
  if (typeof id !== "string") return null;
  return registry.find((pack) => pack.id === id) ?? null;
}
