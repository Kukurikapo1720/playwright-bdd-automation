class CartPage {
  constructor(page) {
    this.page = page;

    // "View Cart" button in cart drawer
    this.viewCartButton = "//a[normalize-space()='View Cart']";

    // Cart page indicator
    this.cartPageHeader = "//h1[contains(text(),'Shopping Cart')]";

    // Proceed to Checkout button on cart page
    this.proceedToCheckoutButton =
      "//a[normalize-space()='Proceed to Checkout']";
  }

  async openCart() {
    // Open cart via drawer
    await this.page.waitForSelector(this.viewCartButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.viewCartButton);

    // Validate Shopping Cart page
    await this.page.waitForSelector(this.cartPageHeader, {
      state: "visible",
      timeout: 30000
    });

    // Click Proceed to Checkout
    await this.page.waitForSelector(this.proceedToCheckoutButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.proceedToCheckoutButton);
  }
}

module.exports = { CartPage };
