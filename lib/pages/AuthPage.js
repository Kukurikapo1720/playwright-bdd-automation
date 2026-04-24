class AuthPage {
  constructor(page) {
    this.page = page;

    this.signUpLink = "//a[contains(text(),'Sign Up')]";
    this.emailInput = "//input[@id='spree_user_email']";
    this.passwordInput = "//input[@id='spree_user_password']";
    this.confirmPasswordInput = "//input[@id='spree_user_password_confirmation']";
    this.submitButton = "//input[@type='submit']";
  }

  async register(email, password) {
    // Open Sign Up page
    await this.page.click(this.signUpLink);

    // Wait for form to be visible
    await this.page.waitForSelector(this.emailInput);

    // Fill form
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);

    // Submit form
    await this.page.click(this.submitButton);
  }
}

module.exports = { AuthPage };
