const { After, AfterAll } = require("@cucumber/cucumber");

After(async function () {
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
});
