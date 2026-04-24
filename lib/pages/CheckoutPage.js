class CheckoutPage {
  constructor(page) {
    this.page = page;

    /* ---------- PAGE INDICATOR ---------- */
    this.checkoutHeader = "//a[contains(text(),'Proceed to Checkout')]";

    /* ---------- SHIPPING ADDRESS ---------- */
    this.countrySelect = "//select[contains(@id,'country')]";

    this.firstNameInput = "//input[contains(@id,'first_name')]";
    this.lastNameInput = "//input[contains(@id,'last_name')]";
    this.addressInput = "//input[contains(@id,'address1')]";
    this.cityInput = "//input[contains(@id,'city')]";
    this.zipInput = "//input[contains(@id,'zipcode')]";
    this.phoneInput = "//input[contains(@id,'phone')]";

    /* ---------- PAYMENT ---------- */
    this.payNowButton = "//button[contains(text(),'Pay Now')]";

    /* ---------- CONFIRMATION ---------- */
    this.successHeader = "//h1[contains(text(),'Thank you')]";
    this.orderNumber = "//div[contains(text(),'Order Number')]";
  }

  async completeCheckout() {
    /* ---------- WAIT FOR CHECKOUT ---------- */
    await this.page.waitForSelector(this.checkoutHeader, {
      state: "visible",
      timeout: 30000
    });

    /* ---------- SHIPPING ADDRESS (REQUIRED) ---------- */

    // Select shipping country FIRST
    await this.page.waitForSelector(this.countrySelect, { state: "visible" });
    await this.page.selectOption(this.countrySelect, { label: "United States" });

    // Wait for state/province to load, then select
    await this.page.waitForSelector(this.stateSelect, { state: "visible" });
    await this.page.selectOption(this.stateSelect, { label: "California" });

    // Fill required address fields
    await this.page.fill(this.firstNameInput, "John");
    await this.page.fill(this.lastNameInput, "Doe");
    await this.page.fill(this.addressInput, "123 Test Street");
    await this.page.fill(this.cityInput, "Los Angeles");
    await this.page.fill(this.zipInput, "90001");
    await this.page.fill(this.phoneInput, "09171234567");

    /* ---------- STRIPE CREDIT CARD (IFRAMES) ---------- */

    // Stripe card number
    await this.page
      .frameLocator("iframe[name^='__privateStripeFrame']")
      .locator("input[name='cardnumber']")
      .fill("4242424242424242");

    // Expiration date
    await this.page
      .frameLocator("iframe[name^='__privateStripeFrame']")
      .locator("input[name='exp-date']")
      .fill("1234");

    // CVC
    await this.page
      .frameLocator("iframe[name^='__privateStripeFrame']")
      .locator("input[name='cvc']")
      .fill("123");

    // Card country dropdown (outside iframe)
    await this.page.selectOption(
      "//select[contains(@aria-label,'Country')]",
      { label: "Philippines" }
    );

    /* ---------- PAY NOW ---------- */
    await this.page.waitForSelector(this.payNowButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.payNowButton);

    /* ---------- ORDER CONFIRMATION ---------- */
    await this.page.waitForSelector(this.successHeader, {
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
