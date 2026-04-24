@sample_test
Feature: Validate Spree Commerce checkout flow

  Scenario: Validate successful checkout using a new user
    Given user navigates to the Spree Commerce demo site
    When user registers with valid details
    And user selects a product and adds it to the cart
    And user proceeds to checkout and completes the order
    Then validate order confirmation is displayed
