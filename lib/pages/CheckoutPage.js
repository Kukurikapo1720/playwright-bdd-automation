class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.contactInformationHeader = "text=Contact Information";
    this.paymentMethodHeader = "text=Payment Method";
    this.creditCardRadio = "text=Credit card";
    this.cardOption = "text=Card";

    this.shipCountrySelect = "//select[contains(@id,'ship-country')]";
    this.stateInput = "//select[contains(@id,'state')]";
    this.addressInput = "//input[contains(@id,'address1')]";
    this.cityInput = "//input[contains(@id,'city')]";
    this.shipZipInput = "//input[@id='ship-postal_code']";
    this.phoneInput = "//input[contains(@id,'phone')]";

    this.paymentCountrySelect =
      "//select[contains(@id,'payment-countryInput')]";

    this.successHeader =
      "//h1[contains(text(),'Thanks for your order')]";
    this.orderNumber =
      "//p[contains(text(),'Order #')]";
    this.orderSummary =
      "text=Order Items";

    this.payNowButton = "//button[contains(.,'Pay Now')]";
  }

  /* ==========================
     CHECKOUT PAGE VALIDATION
  ========================== */
  async validateOnCheckoutPage() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForSelector(this.contactInformationHeader, {
      timeout: 30000
    });
  }

  async validateOnPaymentMethod() {
    await this.page.waitForSelector(this.paymentMethodHeader, {
      timeout: 30000
    });
    await this.page.waitForSelector(this.creditCardRadio, {
      timeout: 30000
    });
    await this.page.waitForSelector(this.cardOption, {
      timeout: 30000
    });
  }

  async fillStripeDetails() {
    const stripeFrame = this.page
      .frameLocator("iframe[name^='__privateStripeFrame']")
      .first();

    await stripeFrame.locator("input[name='number']").fill("");
    await stripeFrame.locator("input[name='number']").type(
      "4242424242424242",
      { delay: 50 }
    );

    await stripeFrame.locator("input[name='expiry']").fill("");
    await stripeFrame.locator("input[name='expiry']").type(
      "12/34",
      { delay: 50 }
    );

    await stripeFrame.locator("input[name='cvc']").fill("");
    await stripeFrame.locator("input[name='cvc']").type(
      "123",
      { delay: 50 }
    );

    const stripeZip = stripeFrame.locator("input[name='postal']");
    if (await stripeZip.isVisible().catch(() => false)) {
      await stripeZip.fill("");
      await stripeZip.type("90001", { delay: 50 });
    }
  }

  async completeCheckout() {
    await this.validateOnCheckoutPage();

    /* ---------- SHIPPING ---------- */
    await this.page.selectOption(this.shipCountrySelect, {
      label: "United States"
    });
    await this.page.selectOption(this.stateInput, {
      label: "California"
    });
    await this.page.fill(this.addressInput, "123 Test Street");
    await this.page.fill(this.cityInput, "Los Angeles");
    await this.page.fill(this.shipZipInput, "90001");
    await this.page.fill(this.phoneInput, "09171234567");

    /* ---------- PAYMENT METHOD ---------- */
    await this.validateOnPaymentMethod();

    const paymentCountry = this.page.locator(this.paymentCountrySelect);
    if (await paymentCountry.count() > 0) {
      const value = await paymentCountry.inputValue();
      if (value !== "US") {
        await paymentCountry.selectOption({ label: "United States" });
      }
    }

    await this.fillStripeDetails();
    await this.page.click(this.payNowButton);

    await this.page.waitForTimeout(5000);

    /* ---------- RECOVERY FLOW  ---------- */
    const successVisible = await this.page
      .locator(this.successHeader)
      .isVisible()
      .catch(() => false);

    if (!successVisible) {
      console.warn("Success page not detected. Performing recovery flow...");

      await this.page.reload({ waitUntil: "domcontentloaded" });
      await this.validateOnPaymentMethod();

      await this.fillStripeDetails();
      await this.page.click(this.payNowButton);

      await this.page.waitForTimeout(15000);
    }
  }

  async validateOrderSuccess() {
    await this.page.waitForSelector(this.successHeader, {
      state: "visible",
      timeout: 300000
    });

    await this.page.waitForSelector(this.orderNumber, {
      state: "visible",
      timeout: 80000
    });

    const successText = await this.page
      .locator(this.successHeader)
      .innerText();

    const orderNumberText = await this.page
      .locator(this.orderNumber)
      .innerText();

    console.log("SUCCESS MESSAGE:", successText);
    console.log("ORDER NUMBER:", orderNumberText);

    await this.page.waitForSelector(this.orderSummary, {
      state: "visible",
      timeout: 60000
    });

    console.log("Order summary is visible");
  }
}

module.exports = { CheckoutPage };