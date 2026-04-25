class HomePage {
  constructor(page) {
    this.page = page;

    this.burgerMenuButton =
      "//button[contains(@aria-label,'menu') or contains(@class,'menu')]";

    this.homeLink = "//a[normalize-space()='Home']";

    this.firstProduct =
      "(//a[contains(@href,'/products')])[3]";
  }

  async openSite() {
    await this.page.goto("https://demo.spreecommerce.org/");
  }

  async navigateToHomeViaMenu() {
    await this.page.waitForSelector(this.burgerMenuButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.burgerMenuButton);

    await this.page.waitForSelector(this.homeLink, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.homeLink);
  }

  async openFirstProduct() {
    await this.page.waitForSelector(this.firstProduct, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.firstProduct);
  }
}

module.exports = { HomePage };
