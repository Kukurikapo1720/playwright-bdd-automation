class HomePage {
  constructor(page) {
    this.page = page;

    this.burgerMenuButton =
      "//button[contains(@aria-label,'menu') or contains(@class,'menu')]";

    this.addToCartButton = "//button[contains(.,'Add to Cart')]";

    this.homeLink = "//a[normalize-space()='Home']";

    this.firstProduct =
      "(//a[contains(@href,'/products')])[3]";
  }

  async openSite() {
    await this.page.goto("https://demo.spreecommerce.org/");
    await this.page.waitForLoadState("domcontentloaded");
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
    await this.page.goto(
      "https://demo.spreecommerce.org/products/automatic-espresso-machine"
    );

    await this.page.waitForSelector(this.addToCartButton, {
      timeout: 30000
    });
  }
}

module.exports = { HomePage };

