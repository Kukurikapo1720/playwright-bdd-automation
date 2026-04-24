class CartPage {
  constructor(page) {
    this.page = page;

    // "View Cart" button in cart drawer
    this.viewCartButton = "//a[normalize-space()='View Cart']";

    // Cart page indicator
    this.cartPageHeader = "//h1[contains(text(),'Shopping Cart')]";
  }

  async openCart() {
    // Wait for the cart drawer to appear and click "View Cart"
    await this.page.waitForSelector(this.viewCartButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.viewCartButton);

    // Verify Shopping Cart page is displayed
    await this.page.waitForSelector(this.cartPageHeader, {
      state: "visible",
      timeout: 30000
    });
  }
}

module.exports = { CartPage };
