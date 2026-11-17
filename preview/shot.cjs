const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/hero.html'); await p.waitForTimeout(1800);
  await p.screenshot({ path: 'shot-desktop.png' });
  await p.fill('#site', 'example.com'); await p.click('button[type=submit]'); await p.waitForTimeout(2600);
  await p.screenshot({ path: 'shot-checked.png' });
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await m.goto('file://' + __dirname + '/hero.html'); await m.waitForTimeout(1500);
  await m.screenshot({ path: 'shot-mobile.png', fullPage: true });
  console.log('overflow', await m.evaluate(() => document.documentElement.scrollWidth));
  await b.close();
})();
