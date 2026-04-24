class HomePage {
  constructor(page) {
    this.page = page;
    this.loginIcon = "//a[contains(@href,'login')]";
    this.firstProduct = "(//div[contains(@class,'product-component')])[1]";
  }

  async openSite() {
    await this.page.goto("https://demo.spreecommerce.org/");
  }

  async openLoginMenu() {
    await this.page.click(this.loginIcon);
  }

  async openProduct() {
    await this.page.click(this.firstProduct);
  }
}

module.exports = { HomePage };
