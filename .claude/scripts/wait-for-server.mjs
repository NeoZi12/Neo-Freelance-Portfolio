#!/usr/bin/env node
// Polls a local URL until it responds 200, or fails after a timeout.
// Used by /check-quality to wait for `npm run start` to come up.
// Covered by the existing `Bash(node *)` allowlist, so no until-curl pattern needed.
//
// Usage:
//   node .claude/scripts/wait-for-server.mjs                  # default http://localhost:3000
//   node .claude/scripts/wait-for-server.mjs http://localhost:3001
//   WAIT_TIMEOUT=120 node .claude/scripts/wait-for-server.mjs

import http from 'node:http';

const url = process.argv[2] || 'http://localhost:3000';
const totalSeconds = Number(process.env.WAIT_TIMEOUT || 60);
const intervalMs = 500;
const maxTries = Math.ceil((totalSeconds * 1000) / intervalMs);

let tries = 0;
const start = Date.now();

function check() {
  tries += 1;
  http.get(url, (res) => {
    if (res.statusCode === 200) {
      const elapsedMs = Date.now() - start;
      console.log(`READY after ${(elapsedMs / 1000).toFixed(1)}s (${tries} ${tries === 1 ? 'try' : 'tries'}) — ${url}`);
      process.exit(0);
    }
    if (tries >= maxTries) bail(`HTTP ${res.statusCode} after ${tries} tries`);
    setTimeout(check, intervalMs);
  }).on('error', (err) => {
    if (tries >= maxTries) bail(`${err.code || err.message} after ${tries} tries`);
    setTimeout(check, intervalMs);
  });
}

function bail(reason) {
  console.error(`TIMEOUT (${totalSeconds}s) waiting for ${url} — last: ${reason}`);
  process.exit(1);
}

check();
