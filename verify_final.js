const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log("Navigating to home page...");
    await page.goto('http://localhost:3124/', { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for loader to disappear (it takes about 2-3 seconds)
    console.log("Waiting for loader to finish...");
    await page.waitForTimeout(5000);

    // Scroll to bottom to check the white/zinc-100 section
    console.log("Scrolling to bottom...");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/home/jules/verification/screenshots/home_final.png', fullPage: true });
    console.log("Screenshot saved: home_final.png");

  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    await browser.close();
  }
})();
