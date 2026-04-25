class ProductPage {
  constructor(page) {
    this.page = page;

    this.addToCartButton = "//button[contains(text(),'Add to Cart')]";
  }

  async addToCart() {
    await this.page.waitForSelector(this.addToCartButton, {
      state: "visible",
      timeout: 30000
    });

    await this.page.click(this.addToCartButton);
  }
}

module.exports = { ProductPage };
