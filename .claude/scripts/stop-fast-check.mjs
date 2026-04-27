#!/usr/bin/env node
// Stop hook (fast): when assistant declares done, if any source files were
// edited this session, run `tsc --noEmit` + `eslint <changed files>`.
// Budget: ~10s. NO production builds, NO .next/ deletion — those live in
// /check-quality, which is run deliberately. Skips silently when no edits.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, mkdirSync, appendFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const SENTINEL = join(PROJECT_DIR, ".claude", ".session-edits");
const LOG = join(PROJECT_DIR, ".claude", ".last-check.log");

function logLine(msg) {
  try {
    mkdirSync(dirname(LOG), { recursive: true });
    appendFileSync(LOG, `[${new Date().toISOString()}] STOP ${msg}\n`);
  } catch {}
}

// Drain stdin so the hook process exits cleanly.
try { readFileSync(0, "utf8"); } catch {}

// Discussion-only sessions: zero log, zero commands, zero overhead.
if (!existsSync(SENTINEL)) {
  process.exit(0);
}

// Read the list of changed files captured by PostToolUse.
let changedFiles = [];
try {
  const raw = readFileSync(SENTINEL, "utf8");
  changedFiles = [...new Set(raw.split("\n").map(s => s.trim()).filter(Boolean))];
} catch {}

// Clear the sentinel UPFRONT — if this script crashes or is killed mid-run,
// the next Stop won't re-fire on stale state.
try { unlinkSync(SENTINEL); } catch {}

logLine(`fast check — ${changedFiles.length} file(s)`);

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
    maxBuffer: 32 * 1024 * 1024,
  });
  return { code: r.status ?? 1, stdout: r.stdout || "", stderr: r.stderr || "" };
}

const failures = [];

// 1. Whole-project type-check — incremental tsbuildinfo keeps this ~3-5s.
const tsc = run("npx", ["tsc", "--noEmit"]);
if (tsc.code !== 0) {
  failures.push({ name: "tsc --noEmit", out: (tsc.stdout + tsc.stderr).trim().slice(0, 4000) });
}

// 2. Lint only the files touched this session.
if (changedFiles.length > 0) {
  const lint = run("npx", ["eslint", ...changedFiles]);
  if (lint.code !== 0) {
    failures.push({ name: "eslint", out: (lint.stdout + lint.stderr).trim().slice(0, 4000) });
  }
}

if (failures.length === 0) {
  logLine("pass");
  process.exit(0);
}

logLine(`FAIL — ${failures.map(f => f.name).join(", ")}`);

const lines = ["Stop-time fast quality gate FAILED.", ""];
for (const f of failures) {
  lines.push(`--- ${f.name} ---`);
  lines.push(f.out || "(no output)");
  lines.push("");
}
lines.push("Fix and re-run before declaring done. Production-build / bundle checks live in /check-quality.");

process.stderr.write(lines.join("\n"));
process.exit(2);
