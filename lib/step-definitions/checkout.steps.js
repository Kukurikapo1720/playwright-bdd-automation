const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

const { HomePage } = require("../pages/HomePage");
const { AuthPage } = require("../pages/AuthPage");
const { ProductPage } = require("../pages/ProductPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

let browser, page;
let home, auth, product, cart, checkout;

const email = `user${Date.now()}@mail.com`;
const password = "Test@12345";

Given("user navigates to the Spree Commerce demo site", async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();

  home = new HomePage(page);
  auth = new AuthPage(page);
  product = new ProductPage(page);
  cart = new CartPage(page);
  checkout = new CheckoutPage(page);

  await home.openSite();
});

Given("user registers with valid details", async () => {
  await auth.register(email, password);
});

When("user logs in using the registered account", async () => {
  // user is already logged in after registration
});

When("user selects a product and adds it to the cart", async () => {
  await home.openProduct();
  await product.addToCart();
  await cart.openCart();
});

When("user proceeds to checkout and completes the order", async () => {
  await cart.checkout();
  await checkout.completeOrder();
});

Then("validate order confirmation is displayed", async () => {
  await checkout.validateOrderSuccess();
  await browser.close();
});
