class ProductPage {
  constructor(page) {
    this.page = page;

    // "Add to Cart" button on product detail page
    this.addToCartButton = "//button[contains(text(),'Add to Cart')]";
  }

  async addToCart() {
    // Wait until "Add to Cart" button is visible
    await this.page.waitForSelector(this.addToCartButton, {
      state: "visible",
      timeout: 30000
    });

    // Click "Add to Cart"
    await this.page.click(this.addToCartButton);
  }
}

module.exports = { ProductPage };
