// Standalone responsive screenshot + overflow audit.
// Uses globally-installed playwright (npm global).
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const globalPlaywrightPath = join(process.env.APPDATA, 'npm', 'node_modules', 'playwright');
const { chromium } = require(globalPlaywrightPath);

const ROUTES = ['/', '/about', '/portfolio', '/services', '/contact', '/free-guide'];
const WIDTHS = [360, 390, 412, 768, 1024];
const ORIGIN = 'http://localhost:3000';
const OUT_DIR = '.playwright-mcp/audit-2026-04-26';
mkdirSync(OUT_DIR, { recursive: true });

const slug = (r) => r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-');

const results = [];

const browser = await chromium.launch({ headless: true });

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    const url = ORIGIN + route;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      // fallback to load
      try { await page.goto(url, { waitUntil: 'load', timeout: 15000 }); } catch {}
    }
    // Allow any post-mount layout settle
    await page.waitForTimeout(600);
    const metrics = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      route: location.pathname,
    }));
    const file = `${OUT_DIR}/${slug(route)}-${width}.png`;
    await page.screenshot({ path: file, fullPage: false });
    const overflow = metrics.sw > metrics.cw;
    results.push({ width, route, sw: metrics.sw, cw: metrics.cw, overflow, file });
    console.log(`[${width}] ${route} sw=${metrics.sw} cw=${metrics.cw} ${overflow ? 'OVERFLOW' : 'ok'} -> ${file}`);
  }
  await ctx.close();
}

// RTL spot check on / for each width
for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await ctx.newPage();
  const url = ORIGIN + '/?lang=he';
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    try { await page.goto(url, { waitUntil: 'load', timeout: 15000 }); } catch {}
  }
  await page.waitForTimeout(600);
  const metrics = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
    route: location.pathname + location.search,
    dir: document.documentElement.dir || (document.querySelector('[dir]')?.getAttribute('dir') ?? ''),
  }));
  const file = `${OUT_DIR}/home-he-${width}.png`;
  await page.screenshot({ path: file, fullPage: false });
  const overflow = metrics.sw > metrics.cw;
  results.push({ width, route: '/?lang=he', sw: metrics.sw, cw: metrics.cw, overflow, file, dir: metrics.dir });
  console.log(`[${width}] /?lang=he sw=${metrics.sw} cw=${metrics.cw} ${overflow ? 'OVERFLOW' : 'ok'} dir=${metrics.dir} -> ${file}`);
  await ctx.close();
}

await browser.close();

// Emit JSON summary
const summaryFile = `${OUT_DIR}/summary.json`;
import('node:fs/promises').then(async ({ writeFile }) => {
  await writeFile(summaryFile, JSON.stringify(results, null, 2));
  console.log(`\nSummary: ${summaryFile}`);
  const failed = results.filter((r) => r.overflow);
  console.log(`Total: ${results.length} | Overflow failures: ${failed.length}`);
  if (failed.length) {
    console.log('Failures:');
    for (const f of failed) console.log(`  - ${f.route} @ ${f.width}px (sw=${f.sw} > cw=${f.cw})`);
  }
});
