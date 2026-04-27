#!/usr/bin/env node
// PostToolUse hook: after Edit/Write to source files, run tsc --noEmit and
// eslint <touched file>. Hooks read event JSON from stdin, write user-visible
// text to stdout, and surface failures via stderr + non-zero exit.
//
// Exit codes:
//   0  → success or skipped (no source file touched)
//   2  → checks failed; stderr is fed back to Claude for self-correction

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync, appendFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const SENTINEL = join(PROJECT_DIR, ".claude", ".session-edits");
const LOG = join(PROJECT_DIR, ".claude", ".last-check.log");

function logLine(msg) {
  try {
    mkdirSync(dirname(LOG), { recursive: true });
    appendFileSync(LOG, `[${new Date().toISOString()}] ${msg}\n`);
  } catch {}
}

function readEvent() {
  try {
    const raw = readFileSync(0, "utf8");
    if (!raw.trim()) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Neo-Portfolio source layout — no `src/`. Match files under any of these
// top-level directories, plus next.config.* at root.
function isSourcePath(p) {
  if (!p) return false;
  const norm = p.replace(/\\/g, "/");
  if (/(^|\/)next\.config\.(ts|mjs|js)$/.test(norm)) return true;
  if (/\/(app|sections|components|lib|contexts|hooks)\/.+\.(ts|tsx|css)$/.test(norm)) return true;
  return false;
}

function run(cmd, args) {
  // Windows: shell:true is needed because npx is a .cmd shim, but cmd.exe
  // re-parses args, so quote any arg containing whitespace.
  const safeArgs = process.platform === "win32"
    ? args.map(a => (typeof a === "string" && /\s/.test(a) ? `"${a}"` : a))
    : args;
  const r = spawnSync(cmd, safeArgs, {
    cwd: PROJECT_DIR,
    encoding: "utf8",
    shell: process.platform === "win32",
    env: { ...process.env, FORCE_COLOR: "0" },
    windowsVerbatimArguments: false,
  });
  return { code: r.status ?? 1, stdout: r.stdout || "", stderr: r.stderr || "" };
}

const event = readEvent();
const filePath = event?.tool_input?.file_path || event?.tool_input?.path || "";

if (!isSourcePath(filePath)) {
  logLine(`skip non-source: ${filePath || "(no path)"}`);
  process.exit(0);
}

const relPath = relative(PROJECT_DIR, filePath).replace(/\\/g, "/");
logLine(`check ${relPath}`);

// Mark this session as having edited source — Stop hook reads this.
// Sentinel is a deduplicated newline-delimited list of changed source paths,
// so the Stop hook can lint exactly the files that changed.
try {
  mkdirSync(dirname(SENTINEL), { recursive: true });
  let existing = "";
  try { if (existsSync(SENTINEL)) existing = readFileSync(SENTINEL, "utf8"); } catch {}
  const set = new Set(existing.split("\n").map(s => s.trim()).filter(Boolean));
  set.add(relPath);
  writeFileSync(SENTINEL, [...set].join("\n") + "\n");
} catch {}

const failures = [];

// 1. Type-check (whole project — incremental tsbuildinfo keeps this fast).
const tsc = run("npx", ["tsc", "--noEmit"]);
if (tsc.code !== 0) {
  failures.push({ name: "tsc --noEmit", out: (tsc.stdout + tsc.stderr).trim().slice(0, 4000) });
}

// 2. Lint only the touched file (full repo lint is too slow per-edit).
const lint = run("npx", ["eslint", relPath]);
if (lint.code !== 0) {
  failures.push({ name: "eslint", out: (lint.stdout + lint.stderr).trim().slice(0, 4000) });
}

if (failures.length === 0) {
  logLine(`pass ${relative(PROJECT_DIR, filePath)}`);
  process.exit(0);
}

logLine(`FAIL ${relative(PROJECT_DIR, filePath)} — ${failures.map(f => f.name).join(", ")}`);

const lines = [`Quality gate FAILED on ${relative(PROJECT_DIR, filePath)}`, ""];
for (const f of failures) {
  lines.push(`--- ${f.name} ---`);
  lines.push(f.out || "(no output)");
  lines.push("");
}
lines.push("Self-correct before declaring this task done. See .claude/.last-check.log for history.");

process.stderr.write(lines.join("\n"));
process.exit(2);
