class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Checkout step indicators
    this.checkoutHeader = "//a[contains(text(),'Proceed to Checkout')]";

    // Continue / Next buttons (used across checkout steps)
    this.continueButton = "//button[contains(text(),'Save and Continue')]";

    // Order confirmation
    this.orderCompleteHeader = "//h1[contains(text(),'Thank you')]";
    this.orderNumber = "//div[contains(text(),'Order Number')]";
  }

  async completeCheckout() {
    // Ensure we are on the checkout page
    await this.page.waitForSelector(this.checkoutHeader, {
      state: "visible",
      timeout: 30000
    });

    /**
     * Shipping Address step
     * (Demo site usually has default data; we just continue)
     */
    await this.page.waitForSelector(this.continueButton, { state: "visible" });
    await this.page.click(this.continueButton);

    /**
     * Delivery Method step
     */
    await this.page.waitForSelector(this.continueButton, { state: "visible" });
    await this.page.click(this.continueButton);

    /**
     * Payment step
     * (Demo checkout auto-handles payment)
     */
    await this.page.waitForSelector(this.continueButton, { state: "visible" });
    await this.page.click(this.continueButton);

    /**
     * Validate order confirmation
     */
    await this.page.waitForSelector(this.orderCompleteHeader, {
      state: "visible",
      timeout: 30000
    });

    await this.page.waitForSelector(this.orderNumber, {
      state: "visible",
      timeout: 30000
    });
  }
}

module.exports = { CheckoutPage };
