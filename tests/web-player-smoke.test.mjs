import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const htmlPath = new URL("../apps/web/index.html", import.meta.url);
const cssPath = new URL("../apps/web/styles.css", import.meta.url);

async function source(url) {
  return readFile(url, "utf8");
}

test("web shell exposes universal Player semantic mounts", async () => {
  const html = await source(htmlPath);
  for (const id of ["language-selector", "lesson-list", "player", "feedback", "progress"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /name=["']viewport["']/i);
  assert.match(html, /data-action=["']advance["']/);
});

test("shell includes explicit unresolved and optional-media surfaces", async () => {
  const html = await source(htmlPath);
  const css = await source(cssPath);
  assert.match(html, /data-state=["']content-unresolved["']/);
  assert.match(html, /data-optional=["']media["']/);
  assert.match(css, /content-unresolved/);
  assert.match(css, /data-optional=["']media["']/);
});

test("RTL is scoped to language content and never flips app chrome", async () => {
  const html = await source(htmlPath);
  const css = await source(cssPath);
  assert.match(html, /class=["'][^"']*language-content[^"']*["']/);
  assert.match(css, /\.language-content\[dir=["']?rtl["']?\]/);
  assert.doesNotMatch(css, /(?:body|\.app-shell|\.app-header|\.app-nav)\[dir=["']?rtl["']?\]/);
});

test("visual system carries SimpleWay light identity and responsive shell", async () => {
  const css = await source(cssPath);
  assert.match(css, /--sw-blue:\s*#0057d8/i);
  assert.match(css, /--sw-red:\s*#e63946/i);
  assert.match(css, /--sw-yellow:\s*#ffd166/i);
  assert.match(css, /@media\s*\(min-width:\s*900px\)/i);
  assert.match(css, /\.card/);
  assert.match(css, /\.progress-track/);
});

const appPath = new URL("../apps/web/app.mjs", import.meta.url);

test("browser controller imports only universal pack runtime and view-model APIs", async () => {
  const app = await source(appPath);
  assert.match(app, /listLanguagePacks/);
  assert.match(app, /getLanguagePack/);
  assert.match(app, /createLessonRuntime/);
  assert.match(app, /advanceLessonRuntime/);
  assert.match(app, /recordLessonEvidence/);
  assert.match(app, /createPlayerViewModel/);
  assert.doesNotMatch(app, /(?:===|!==)\s*["'](?:english|hnk|esperanto)["']/i);
});

test("controller owns fresh session lifecycle and recoverable runtime actions", async () => {
  const app = await source(appPath);
  assert.match(app, /function\s+selectLanguage\s*\(/);
  assert.match(app, /createLessonRuntime\s*\(/);
  assert.match(app, /runtime\s*=\s*null/);
  assert.match(app, /evidenceSequence\s*=\s*0/);
  assert.match(app, /const\s+previousRuntime\s*=\s*runtime/);
  assert.match(app, /runtime\s*=\s*previousRuntime/);
  assert.match(app, /viewModel\.canAdvance/);
});

test("HTML boots the universal browser controller", async () => {
  const html = await source(htmlPath);
  assert.match(html, /<script[^>]+type=["']module["'][^>]+src=["']\.\/app\.mjs["']/i);
});