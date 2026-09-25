import { createUniversalLearningCycle } from "./universal-learning-cycle.mjs";

export function createUniversalMicroLesson({ id, capability, realization }) {
 if (typeof id !== "string" || !id.trim()) throw new TypeError("Invalid universal microlesson: id is required");
 const cycle = createUniversalLearningCycle({ capability, realization });
 const primaryRepresentation = cycle.realization.representations.find((item) => item.role === "primary") ?? cycle.realization.representations[0] ?? null;
 return Object.freeze({
   id: id.trim(),
   method: cycle.method,
   language: cycle.language,
   capability: cycle.capability,
   realization: cycle.realization,
   primaryRepresentation,
   status: primaryRepresentation ? "ready" : "content-unresolved",
   cycle
 });
}
