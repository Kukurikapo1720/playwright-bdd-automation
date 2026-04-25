class CartPage {
  constructor(page) {
    this.page = page;

    this.viewCartButton = "//a[normalize-space()='View Cart']";

    this.cartPageHeader = "//h1[contains(text(),'Shopping Cart')]";

    this.proceedToCheckoutButton =
      "//a[normalize-space()='Proceed to Checkout']";
  }

  async openCart() {
    await this.page.waitForSelector(this.viewCartButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.viewCartButton);

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
