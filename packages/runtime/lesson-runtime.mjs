import { validateEvidence } from "../core/evidence.mjs";
const STAGE_COUNT = 10;
function freezeRuntime(r) { return Object.freeze({ ...r, microLessons: Object.freeze([...r.microLessons]), evidence: Object.freeze([...r.evidence]), progress: Object.freeze({ ...r.progress }) }); }
export function createLessonRuntime({ id, microLessons }) {
 if (typeof id !== "string" || !id.trim()) throw new TypeError("Invalid lesson runtime: id is required");
 if (!Array.isArray(microLessons) || microLessons.length === 0) throw new TypeError("Invalid lesson runtime: microLessons must be non-empty");
 return freezeRuntime({ id: id.trim(), microLessons, currentMicroLessonIndex: 0, currentStageIndex: 0, status: "in-progress", evidence: [], progress: { completedSteps: 0, totalSteps: microLessons.length * STAGE_COUNT } });
}
export function advanceLessonRuntime(runtime) {
 if (runtime.status === "completed") return runtime;
 const completedSteps = runtime.progress.completedSteps + 1;
 if (completedSteps >= runtime.progress.totalSteps) return freezeRuntime({ ...runtime, status: "completed", progress: { ...runtime.progress, completedSteps } });
 let currentMicroLessonIndex = runtime.currentMicroLessonIndex;
 let currentStageIndex = runtime.currentStageIndex + 1;
 if (currentStageIndex >= STAGE_COUNT) { currentStageIndex = 0; currentMicroLessonIndex += 1; }
 return freezeRuntime({ ...runtime, currentMicroLessonIndex, currentStageIndex, progress: { ...runtime.progress, completedSteps } });
}
export function recordLessonEvidence(runtime, input) {
 const evidence = validateEvidence(input);
 if (runtime.evidence.some((item) => item.id === evidence.id)) throw new TypeError("Invalid lesson runtime: duplicate evidence id");
 return freezeRuntime({ ...runtime, evidence: [...runtime.evidence, evidence] });
}
