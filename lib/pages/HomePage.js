class HomePage {
  constructor(page) {
    this.page = page;
    this.firstProduct = "//div[@class='p-4'][1]";
  }

  async openSite() {
    await this.page.goto("https://demo.spreecommerce.org/");
  }

  async openProduct() {
    await this.page.click(this.firstProduct);
  }
}

module.exports = { HomePage };
