#!/usr/bin/env node
// Stop hook: when assistant declares done, if any source file was edited this
// session, run `rm -rf .next && next build && size-limit` to catch bundle
// bloat and build errors. Skips silently if no source edits happened.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, mkdirSync, appendFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const SENTINEL = join(PROJECT_DIR, ".claude", ".session-edits");
const LOG = join(PROJECT_DIR, ".claude", ".last-check.log");
const NEXT_DIR = join(PROJECT_DIR, ".next");

function logLine(msg) {
  try {
    mkdirSync(dirname(LOG), { recursive: true });
    appendFileSync(LOG, `[${new Date().toISOString()}] STOP ${msg}\n`);
  } catch {}
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: PROJECT_DIR,
    encoding: "utf8",
    shell: process.platform === "win32",
    env: { ...process.env, FORCE_COLOR: "0", NODE_ENV: "production" },
    maxBuffer: 64 * 1024 * 1024,
  });
  return { code: r.status ?? 1, stdout: r.stdout || "", stderr: r.stderr || "" };
}

// Drain stdin so the hook process exits cleanly.
try { readFileSync(0, "utf8"); } catch {}

if (!existsSync(SENTINEL)) {
  logLine("skip — no src edits this session");
  process.exit(0);
}

logLine("starting build check");

// Clean .next so size-limit measures a fresh build (no carry-over chunks).
try {
  if (existsSync(NEXT_DIR)) {
    rmSync(NEXT_DIR, { recursive: true, force: true });
    logLine(".next removed");
  }
} catch (err) {
  logLine(`WARN failed to remove .next: ${err?.message ?? err}`);
}

const failures = [];

const build = run("npx", ["next", "build"]);
if (build.code !== 0) {
  failures.push({ name: "next build", out: (build.stdout + build.stderr).trim().slice(0, 6000) });
}

let hasSizeLimit = false;
try {
  const pkg = JSON.parse(readFileSync(join(PROJECT_DIR, "package.json"), "utf8"));
  hasSizeLimit = Array.isArray(pkg["size-limit"]) && pkg["size-limit"].length > 0;
} catch {}

if (hasSizeLimit && build.code === 0) {
  const sl = run("npx", ["size-limit"]);
  if (sl.code !== 0) {
    failures.push({ name: "size-limit", out: (sl.stdout + sl.stderr).trim().slice(0, 4000) });
  }
}

try { unlinkSync(SENTINEL); } catch {}

if (failures.length === 0) {
  logLine("pass");
  process.exit(0);
}

logLine(`FAIL — ${failures.map(f => f.name).join(", ")}`);

const lines = ["Stop-time quality gate FAILED — build or bundle budget broke.", ""];
for (const f of failures) {
  lines.push(`--- ${f.name} ---`);
  lines.push(f.out || "(no output)");
  lines.push("");
}
lines.push("Fix and re-run before declaring done. See .claude/.last-check.log for history.");

process.stderr.write(lines.join("\n"));
process.exit(2);
