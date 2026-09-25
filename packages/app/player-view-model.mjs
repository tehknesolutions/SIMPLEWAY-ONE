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
const CAMPAIGN_DONE_STATES = new Set(['EVIDENCED','CHECKPOINTED']);
export function createCampaignPlayerViewModel({session}={}) {
  if (!session || typeof session !== 'object') fail('campaign session is required');
  const nodes=Object.values(session.projection?.nodes??{});
  const progress=Object.freeze({
    completedSteps:nodes.filter(node=>CAMPAIGN_DONE_STATES.has(node.state)).length,
    totalSteps:nodes.length,
    journalCursor:session.projection?.journalCursor??0
  });
  const step=session.status==='SELECTED'?session.mission?.steps?.[0]:null;
  const realizations=step?.realizations??[];
  const primary=realizations.find(item=>item?.status==='READY'&&item.bundle?.primary)?.bundle?.primary??null;
  const auxiliary=realizations.flatMap(item=>item?.bundle?.support??[]);
  return Object.freeze({
    status:session.status, stage:step??null, progress,
    primaryRepresentation:primary,
    auxiliaryRepresentations:Object.freeze([...auxiliary]),
    direction:primary?.direction??'ltr', media:null, feedback:null,
    canAdvance:Boolean(primary)&&session.status==='SELECTED', why:session.why??[]
  });
}
