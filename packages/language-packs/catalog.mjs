import { createUniversalMicroLesson } from "../method/universal-microlesson.mjs";

const capability = Object.freeze({
  id: "a1.language.speak-hnk",
  canDo: "ask whether someone speaks HNK",
  level: "A1"
});

const realizations = Object.freeze({
  english: Object.freeze({
    capabilityId: capability.id,
    language: "english",
    representations: Object.freeze([
      Object.freeze({ id: "en", value: "Do you speak HNK?", script: "Latn", direction: "ltr", role: "primary" })
    ])
  }),
  hnk: Object.freeze({
    capabilityId: capability.id,
    language: "hnk",
    representations: Object.freeze([
      Object.freeze({ id: "hnk", value: "EN ZAMI HNK KE", script: "Latn", direction: "ltr", role: "primary" })
    ]),
    authority: Object.freeze({ status: "confirmed-project-canon" })
  }),  esperanto: Object.freeze({
    capabilityId: capability.id,
    language: "esperanto",
    representations: Object.freeze([]),
    authority: Object.freeze({ status: "unresolved" })
  })
});

function makePack(id, label, realization) {
  const microLesson = createUniversalMicroLesson({
    id: "ml-a1-speak-hnk",
    capability,
    realization
  });
  return Object.freeze({
    id,
    label,
    status: microLesson.status,
    level: "A1",
    microLessons: Object.freeze([microLesson])
  });
}

const registry = Object.freeze([
  makePack("english", "English", realizations.english),
  makePack("hnk", "HNK", realizations.hnk),
  makePack("esperanto", "Esperanto", realizations.esperanto)
]);

export function listLanguagePacks() {
  return Object.freeze([...registry]);
}

export function getLanguagePack(id) {
  if (typeof id !== "string") return null;
  return registry.find((pack) => pack.id === id) ?? null;
}