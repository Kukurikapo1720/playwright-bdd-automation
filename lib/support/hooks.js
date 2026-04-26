//const { After, AfterAll } = require("@cucumber/cucumber");

/*After(async function () {
  if (this.page) {
    await this.page.close();
    this.page = null;
  }

  if (this.context) {
    await this.context.close();
    this.context = null;
  }

  if (this.browser) {
    await this.browser.close();
    this.browser = null;
  }
});

AfterAll(async function () {
  process.exit(0);
}); */

const { Before, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

Before(async function () {
  this.browser = await chromium.launch({
    headless: true   // ✅ REQUIRED IN CODESPACES
  });

  this.context = await this.browser.newContext();

  // ✅ Visual debugging via trace
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true
  });

  this.page = await this.context.newPage();
});

After(async function () {
  // ✅ Save trace
  await this.context.tracing.stop({ path: "trace.zip" });

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

