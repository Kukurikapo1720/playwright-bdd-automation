class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.countrySelect = "//select[contains(@id,'country')]";
    this.addressInput = "//input[contains(@id,'address1')]";
    this.cityInput = "//input[contains(@id,'city')]";
    this.stateInput = "//select[contains(@id,'state')]";
    this.zipInput = "//input[contains(@id,'ship-postal_code')]";
    this.phoneInput = "//input[contains(@id,'phone')]";

    this.payNowButton = "//button[contains(text(),'Pay Now')]";

    this.successHeader = "//h1[contains(text(),'Thank you')]";
    this.orderNumber = "//div[contains(text(),'Order Number')]";
  }

  async completeCheckout() {

    await this.page.waitForSelector(this.countrySelect, { state: "visible" });
    await this.page.selectOption(this.countrySelect, { label: "United States" });

    await this.page.waitForSelector(this.stateInput, { state: "visible" });
    await this.page.selectOption(this.stateInput, { label: "California" });
    
    await this.page.fill(this.addressInput, "123 Test Street");
    await this.page.fill(this.cityInput, "Los Angeles");
    await this.page.fill(this.zipInput, "90001");
    await this.page.fill(this.phoneInput, "09171234567");

    // Stripe card number
    await this.page
      .frameLocator("iframe[name^='__privateStripeFrame']")
      .locator("input[name='cardnumber']")
      .fill("5555555555554444");

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

    await this.page.selectOption(
      "//select[contains(@aria-label,'Country')]",
      { label: "United State" }
    );
    await this.page.fill(this.zipInput, "12345");
    await this.page.waitForSelector(this.payNowButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.payNowButton);

    await this.page.waitForSelector(this.successHeader, {
      state: "visible",
      timeout: 100000
    });

    await this.page.waitForSelector(this.orderNumber, {
      state: "visible",
      timeout: 50000
    });
  }
}

module.exports = { CheckoutPage };
