function fail(message) {
  throw new TypeError(`Invalid player view model: ${message}`);
}

export function createPlayerViewModel({ runtime, microLesson }) {
  if (!runtime || typeof runtime !== "object") fail("runtime is required");
  if (!microLesson || typeof microLesson !== "object") fail("microLesson is required");
  const current = runtime.microLessons?.[runtime.currentMicroLessonIndex];
  if (!current || current.id !== microLesson.id) fail("microLesson must match current microlesson");

  const representations = microLesson.realization?.representations ?? [];
  const primaryRepresentation = microLesson.primaryRepresentation ?? null;
  const auxiliaryRepresentations = representations.filter((item) => item !== primaryRepresentation);
  const stage = microLesson.cycle?.stages?.[runtime.currentStageIndex] ?? null;
  const direction = primaryRepresentation?.direction ?? "ltr";
  const progress = Object.freeze({
    completedSteps: runtime.progress.completedSteps,
    totalSteps: runtime.progress.totalSteps
  });

  return Object.freeze({
    language: microLesson.language,
    status: microLesson.status,
    stage,
    progress,
    capability: microLesson.capability,    primaryRepresentation,
    auxiliaryRepresentations: Object.freeze([...auxiliaryRepresentations]),
    direction,
    media: microLesson.media ?? null,
    feedback: null,
    canAdvance: runtime.status !== "completed" && microLesson.status === "ready"
  });
}