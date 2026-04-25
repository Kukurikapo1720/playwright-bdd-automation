class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.shipcountrySelect = "//select[contains(@id,'ship-country')]";
    this.paymentcountrySelect = "//select[contains(@id,'payment-country')]";
    this.addressInput = "//input[contains(@id,'address1')]";
    this.cityInput = "//input[contains(@id,'city')]";
    this.stateInput = "//select[contains(@id,'state')]";
    this.shipzipInput = "//input[contains(@id,'ship-postal_code')]";
     this.paymentzipInput = "//input[contains(@id,'ship-postal_code')]";
    this.phoneInput = "//input[contains(@id,'phone')]";

    this.payNowButton = "//button[contains(text(),'Pay Now')]";

    this.successHeader = "//h1[contains(text(),'Thanks for your order')]";
    this.orderNumber = "//p[contains(text(),'Order')]";
  }

  async completeCheckout() {

  // ---------- SHIPPING ----------
  await this.page.waitForSelector(this.shipcountrySelect, { state: "visible" });
  await this.page.selectOption(this.shipcountrySelect, { label: "United States" });

  await this.page.waitForSelector(this.stateInput, { state: "visible" });
  await this.page.selectOption(this.stateInput, { label: "California" });

  await this.page.fill(this.addressInput, "123 Test Street");
  await this.page.fill(this.cityInput, "Los Angeles");
  await this.page.fill(this.shipzipInput, "90001");
  await this.page.fill(this.phoneInput, "09171234567");

  // ---------- STRIPE ----------
  const stripeFrame = this.page
    .frameLocator("iframe[name^='__privateStripeFrame']")
    .first();

  const fillStripeFields = async () => {
    await stripeFrame.locator("input[name='number']").fill("5555555555554444");
    await stripeFrame.locator("input[name='expiry']").fill("1234");
    await stripeFrame.locator("input[name='cvc']").fill("123");
    await this.page.fill(this.paymentzipInput, "12345");
  };

  // Initial entry
  await fillStripeFields();

  // ---------- PAY NOW ----------
  await this.page.waitForSelector(this.payNowButton, {
    state: "visible",
    timeout: 30000
  });
  await this.page.click(this.payNowButton);

  // ---------- VERIFY PROGRESSION ----------
  await this.page.waitForTimeout(3000);

  const payNowStillVisible = await this.page
    .locator(this.payNowButton)
    .isVisible()
    .catch(() => false);

  if (payNowStillVisible) {
    console.warn("⚠️ Pay Now still visible — re‑entering Stripe details and retrying");

    await fillStripeFields();

    await this.page.waitForSelector(this.payNowButton, {
      state: "visible",
      timeout: 30000
    });
    await this.page.click(this.payNowButton);
  }
}


async validateOrderSuccess() {
  await this.page.waitForTimeout(3000);

  const hasError = await this.page.locator(
    "text=card|text=payment|text=failed|text=error"
  ).count();

  if (hasError > 0) {
    throw new Error("Payment failed or was blocked in CI");
  }

  const payNowVisible = await this.page.locator(this.payNowButton).isVisible();

  if (payNowVisible) {
    throw new Error("Checkout did not progress after Pay Now");
  }
}

}
module.exports = { CheckoutPage };
