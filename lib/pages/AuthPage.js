class AuthPage {
  constructor(page) {
    this.page = page;

    this.signUpLink = "//a[contains(text(),'Sign up')]";

    this.firstNameInput = "//input[@id='firstName']";
    this.lastNameInput = "//input[@id='lastName']";
    this.emailInput = "//input[@id='email']";
    this.passwordInput = "//input[@id='password']";
    this.confirmPasswordInput = "//input[@id='passwordConfirmation']";

    this.termsCheckbox = "//input[@type='checkbox']";
    this.submitButton = "//button[contains(text(),'Create Account')]";
  }

  async register(email, password) {
    await this.page.waitForSelector(this.signUpLink, { state: "visible" });
    await this.page.waitForTimeout(500);
    await this.page.click(this.signUpLink);

    await this.page.waitForSelector(this.firstNameInput, { state: "visible" });

    await this.page.fill(this.firstNameInput, "John");
    await this.page.fill(this.lastNameInput, "Doe");
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);

    // Accept terms and conditions
    await this.page.check(this.termsCheckbox);

    // Submit form
    await this.page.click(this.submitButton);

  await this.page.waitForURL("**/account", { timeout: 30000 });
  await this.page.waitForSelector("//h1[contains(text(),'Account Overview')]", {
    state: "visible"
  });

}

module.exports = { AuthPage };
