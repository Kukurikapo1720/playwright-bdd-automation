
const { After } = require("@cucumber/cucumber");

After(async function () {
  if (this.browser) {
    await this.browser.close();
    this.browser = null;
  }
});
