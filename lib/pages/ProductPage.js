class ProductPage {
  constructor(page) {
    this.page = page;

    this.addToCartButton = "//button[contains(text(),'Add to Cart')]";

    this.cartCountBadge = "//span[contains(@class,'cart-badge')]";
  }

  async addToCart() {
    // Wait until "Add to Cart" button is visible
    await this.page.waitForSelector(this.addToCartButton, {
      state: "visible",
      timeout: 30000
    });

    // Click "Add to Cart"
    await this.page.click(this.addToCartButton);

    // Validate that item was added to cart
    await this.page.waitForSelector(this.cartCountBadge, {
      state: "visible",
      timeout: 30000
    });
  }
}

module.exports = { ProductPage };
