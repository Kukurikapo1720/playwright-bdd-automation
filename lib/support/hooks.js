After(async function (scenario) {
  if (scenario.result.status === "FAILED" && this.page) {
    await this.page.screenshot({ path: "failure.png" });
  }
  if (this.browser) {
    await this.browser.close();
  }
});

