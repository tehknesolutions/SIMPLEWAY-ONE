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