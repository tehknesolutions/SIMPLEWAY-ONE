import { listLanguagePacks, getLanguagePack } from "../../packages/language-packs/catalog.mjs";
import { createLessonRuntime, advanceLessonRuntime, recordLessonEvidence } from "../../packages/runtime/lesson-runtime.mjs";
import { createPlayerViewModel } from "../../packages/app/player-view-model.mjs";

const mounts = {
  languages: document.querySelector("#language-selector"),
  lessons: document.querySelector("#lesson-list"),
  content: document.querySelector("[data-content-slot]"),
  capability: document.querySelector("[data-capability]"),
  representation: document.querySelector("[data-representation]"),
  unresolved: document.querySelector('[data-state="content-unresolved"]'),
  media: document.querySelector('[data-optional="media"]'),
  feedback: document.querySelector("#feedback"),
  progressLabel: document.querySelector("[data-progress-label]"),
  progressBar: document.querySelector("[data-progress-bar]"),
  advance: document.querySelector('[data-action="advance"]')
};

let selectedPack = null;
let runtime = null;
let evidenceSequence = 0;

function currentMicroLesson() {
  return runtime?.microLessons?.[runtime.currentMicroLessonIndex] ?? null;
}

function renderLanguages() {
  mounts.languages.replaceChildren(...listLanguagePacks().map((pack) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "language-option";
    button.textContent = pack.label; button.dataset.languageId = pack.id;
    button.addEventListener("click", () => selectLanguage(pack.id));
    return button;
  }));
}function renderLessons() {
  if (!selectedPack) { mounts.lessons.textContent = "Choose a language."; return; }
  mounts.lessons.replaceChildren(...selectedPack.microLessons.map((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "lesson-option";
    button.textContent = `${selectedPack.level} · ${lesson.capability.canDo}`;
    button.disabled = index !== 0;
    return button;
  }));
}

function renderPlayer() {
  if (!runtime) return;
  const microLesson = currentMicroLesson();
  const viewModel = createPlayerViewModel({ runtime, microLesson });
  mounts.capability.textContent = viewModel.capability.canDo;
  mounts.content.dir = viewModel.direction;
  mounts.media.replaceChildren();
  mounts.media.hidden = !viewModel.media;
  if (viewModel.media?.type === "image") {
    const image = document.createElement("img");
    image.src = viewModel.media.src; image.alt = viewModel.media.alt ?? "";
    mounts.media.append(image);
  }
  mounts.representation.textContent = viewModel.primaryRepresentation?.value ?? "—";
  mounts.unresolved.hidden = viewModel.status !== "content-unresolved";
  mounts.content.hidden = viewModel.status === "content-unresolved";
  mounts.advance.disabled = !viewModel.canAdvance;
  mounts.progressLabel.textContent = `${viewModel.progress.completedSteps} / ${viewModel.progress.totalSteps}`;
  mounts.progressBar.style.width = `${(viewModel.progress.completedSteps / viewModel.progress.totalSteps) * 100}%`;
}

function selectLanguage(id) {
  selectedPack = getLanguagePack(id);
  runtime = null;
  evidenceSequence = 0;
  mounts.feedback.textContent = "";
  if (!selectedPack) { renderLessons(); return; }
  runtime = createLessonRuntime({ id: `session-${selectedPack.id}`, microLessons: selectedPack.microLessons });
  renderLessons(); renderPlayer();
}function runRuntimeAction(action) {
  if (!runtime) return;
  const previousRuntime = runtime;
  try {
    runtime = action(runtime);
    mounts.feedback.textContent = "";
    renderPlayer();
  } catch (error) {
    runtime = previousRuntime;
    mounts.feedback.textContent = error instanceof Error ? error.message : "Action could not be completed.";
    renderPlayer();
  }
}

mounts.advance.addEventListener("click", () => {
  if (!runtime) return;
  const viewModel = createPlayerViewModel({ runtime, microLesson: currentMicroLesson() });
  if (!viewModel.canAdvance) return;
  runRuntimeAction((snapshot) => advanceLessonRuntime(snapshot));
});

// Evidence stays Runtime-owned; future activity renderers can call this helper.
function recordEvidence(input) {
  evidenceSequence += 1;
  runRuntimeAction((snapshot) => recordLessonEvidence(snapshot, { ...input, id: input.id ?? `web-evidence-${evidenceSequence}` }));
}
void recordEvidence;

renderLanguages();
renderLessons();
