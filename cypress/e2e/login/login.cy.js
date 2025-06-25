import { loginPage } from "../../pageObjects/loginPage";

describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("TCF_001 - Login with valid credentials", () => {
    cy.login();

    cy.url().should('include', '/inventory.html');
    cy.get(loginPage.titleInventory).should('contain', 'Products');
  });

  it("TCF_002 - Login with trimmed username and password", () => {
    cy.loginWithTrimmedCredentials();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it("TCF_003 - Login with invalid username and valid password", () => {
    cy.fillFields({
      [loginPage.usernameInput]: 'invalid_user',
      [loginPage.passwordInput]: Cypress.env('Password'),
    });

    cy.get(loginPage.loginButton).click();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it("TCF_004 - Login with valid username and wrong password", () => {
    cy.fillFields({
      [loginPage.usernameInput]: Cypress.env('Username'),
      [loginPage.passwordInput]: 'invalid_password'
    });

    cy.get(loginPage.loginButton).click();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it('TCF_005 - Login with empty username', () => {
    cy.get(loginPage.passwordInput).type(Cypress.env('Password'));
    cy.get(loginPage.loginButton).click();

    cy.checkLoginError('Epic sadface: Username is required');
  });

  it('TCF_006 - Login with empty password', () => {
    cy.get(loginPage.usernameInput).type(Cypress.env('Username'));
    cy.get(loginPage.loginButton).click();

    cy.checkLoginError('Epic sadface: Password is required');
  });

  it('TCF_007 - Login with both fields empty', () => {
    cy.get(loginPage.loginButton).click();

    cy.checkLoginError('Epic sadface: Username is required');
  });

  it('TCF_008 - Login with SQL injection in username', () => {
    cy.fillFields({
      [loginPage.usernameInput]: "admin'--",
      [loginPage.passwordInput]: 'any_password'
    });
  
    cy.get(loginPage.loginButton).click();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  })

  it('TCUX_001 - Tab navigation between input fields', () => {
    cy.get(loginPage.usernameInput).focus().should('be.focused');

    cy.focused().tab();
    cy.get(loginPage.passwordInput).should('be.focused');

    cy.focused().tab();
    cy.get(loginPage.loginButton).should('be.focused');
  })

  it('TCUX_002 - Password field is hidden', () => {
    cy.get(loginPage.passwordInput)
      .should('have.attr', 'type', 'password');
  });

  it('TCUX_003 - Login using Enter key submits the form', () => {
    cy.fillFields({
    [loginPage.usernameInput]: Cypress.env('Username'),
    [loginPage.passwordInput]: Cypress.env('Password'),
    });

    cy.get(loginPage.passwordInput).type('{enter}');

    cy.url().should('include', '/inventory.html');

    cy.get(loginPage.titleInventory).should('contain', 'Products');
  });
});
