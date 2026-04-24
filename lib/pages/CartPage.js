class CartPage {
  constructor(page) {
    this.page = page;

    // Cart link / icon in the header
    this.cartLink = "//a[contains(@href,'cart')]";

    // Cart page indicator (used to confirm cart is opened)
    this.cartPageHeader = "//h1[contains(text(),'Shopping Cart')]";
  }

  async openCart() {
    // Click the cart icon/link
    await this.page.waitForSelector(this.cartLink, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.cartLink);

    // Verify cart page is displayed
    await this.page.waitForSelector(this.cartPageHeader, {
      state: "visible",
      timeout: 30000
    });
  }
}

module.exports = { CartPage };
