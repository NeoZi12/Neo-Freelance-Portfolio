// Run Lighthouse mobile 3x sequentially, capture Perf/LCP/CLS/INP, compute median.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const URL = process.env.AUDIT_URL || 'http://localhost:3000/';
const OUT = '.claude/lighthouse';
mkdirSync(OUT, { recursive: true });

const runs = [];
for (let i = 1; i <= 3; i++) {
  const jsonPath = join(OUT, `run-${i}.json`);
  try { rmSync(jsonPath, { force: true }); } catch {}
  console.log(`\n=== Run ${i}/3 ===`);
  const args = [
    'lighthouse',
    URL,
    '--quiet',
    '--only-categories=performance',
    '--form-factor=mobile',
    '--throttling-method=simulate',
    '--screenEmulation.mobile=true',
    '--screenEmulation.width=412',
    '--screenEmulation.height=823',
    '--screenEmulation.deviceScaleFactor=1.75',
    '--chrome-flags=--headless=new --no-sandbox',
    '--output=json',
    `--output-path=${jsonPath}`,
  ];
  // On Windows, npx is npx.cmd. Use shell:true for cross-platform.
  const res = spawnSync('npx', args, { stdio: 'inherit', shell: true, env: process.env });
  // Note: chrome-launcher destroyTmp races on Windows and exits non-zero AFTER writing the JSON.
  // Treat the JSON file's existence as the authoritative signal.
  if (res.status !== 0) {
    console.error(`Run ${i} exit code ${res.status} (continuing — JSON may still be valid)`);
  }
  try {
    const j = JSON.parse(readFileSync(jsonPath, 'utf8'));
    const perf = Math.round((j.categories.performance.score || 0) * 100);
    const lcp = j.audits['largest-contentful-paint']?.numericValue ?? null;
    const cls = j.audits['cumulative-layout-shift']?.numericValue ?? null;
    const tbt = j.audits['total-blocking-time']?.numericValue ?? null;
    const fcp = j.audits['first-contentful-paint']?.numericValue ?? null;
    const si  = j.audits['speed-index']?.numericValue ?? null;
    runs.push({ perf, lcp, cls, tbt, fcp, si });
    console.log(`  perf=${perf} lcp=${lcp?.toFixed(0)}ms cls=${cls?.toFixed(3)} tbt=${tbt?.toFixed(0)}ms fcp=${fcp?.toFixed(0)}ms si=${si?.toFixed(0)}`);
  } catch (e) {
    console.error('Parse failed:', e.message);
    runs.push(null);
  }
}

const valid = runs.filter(Boolean);
const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  const n = s.length;
  return n === 0 ? null : (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2);
};

const summary = {
  url: URL,
  runs,
  validRuns: valid.length,
  medians: {
    perf: median(valid.map((r) => r.perf)),
    lcp:  median(valid.map((r) => r.lcp)),
    cls:  median(valid.map((r) => r.cls)),
    tbt:  median(valid.map((r) => r.tbt)),
    fcp:  median(valid.map((r) => r.fcp)),
    si:   median(valid.map((r) => r.si)),
  },
};
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
console.log('\n=== MEDIAN ===');
console.log(JSON.stringify(summary.medians, null, 2));
