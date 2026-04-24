class HomePage {
  constructor(page) {
    this.page = page;

    // Burger / three-line menu button
    this.burgerMenuButton =
      "//button[contains(@aria-label,'menu') or contains(@class,'menu')]";

    // Home link inside the burger menu
    this.homeLink = "//a[normalize-space()='Home']";

    // First product on the storefront
    this.firstProduct =
      "(//a[contains(@href,'/products')])[3]";
  }

  async openSite() {
    await this.page.goto("https://demo.spreecommerce.org/");
  }

  // Navigate back to Home via burger menu
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

  // Open the first product
  async openFirstProduct() {
    await this.page.waitForSelector(this.firstProduct, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.firstProduct);
  }
}

module.exports = { HomePage };
