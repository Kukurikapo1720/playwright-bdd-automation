class AuthPage {
  constructor(page) {
    this.page = page;

    this.signUpLink = "//a[contains(text(),'Sign up')]";
    this.emailInput = "//input[@id='spree_user_email']";
    this.passwordInput = "//input[@id='spree_user_password']";
    this.confirmPasswordInput = "//input[@id='spree_user_password_confirmation']";
    this.submitButton = "//input[@type='submit']";
  }

  async register(email, password) {
    await this.page.waitForSelector(this.signUpLink, { state: "visible" });
    await this.page.waitForTimeout(500);

    await this.page.click(this.signUpLink);

    await this.page.waitForSelector(this.emailInput, { state: "visible" });

    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "networkidle" }),
      this.page.click(this.submitButton)
    ]);
  }
}

module.exports = { AuthPage };
