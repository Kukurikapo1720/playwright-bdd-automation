class CartPage {
  constructor(page) {
    this.page = page;

    // Checkout button on the cart page
    this.checkoutButton = "//a[contains(text(),'Checkout')]";

    // Checkout page indicator
    this.checkoutPageHeader = "//h1[contains(text(),'Checkout')]";
  }

  async checkout() {
    // Wait until Checkout button is available
    await this.page.waitForSelector(this.checkoutButton, {
      state: "visible",
      timeout: 30000
    });

    // Click Checkout
    await this.page.click(this.checkoutButton);

    // Validate navigation to Checkout page
    await this.page.waitForSelector(this.checkoutPageHeader, {
      state: "visible",
      timeout: 30000
    });
  }
}

module.exports = { CartPage };
