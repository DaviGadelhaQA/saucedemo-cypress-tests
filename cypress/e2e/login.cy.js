describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("TCF_001 - Login with valid credentials", () => {
    cy.login();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it("TCF_002 - Login with trimmed username and password", () => {
    cy.loginWithTrimmedCredentials();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it("TCF_003 - Login with invalid username and valid password", () => {
    cy.fillFields({
      '[data-test="username"]': 'invalid_user',
      '[data-test="password"]': Cypress.env('Password'),
    });

    cy.get('[data-test="login-button"]').click();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it("TCF_004 - Login with valid username and wrong password", () => {
    cy.fillFields({
      '[data-test="username"]': Cypress.env('Username'),
      '[data-test="password"]': 'invalid_password'
    });

    cy.get('[data-test="login-button"]').click();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it('TCF_005 - Login with empty username', () => {
    cy.get('[data-test="password"]').type(Cypress.env('Password'));
    cy.get('[data-test="login-button"]').click();

    cy.checkLoginError('Epic sadface: Username is required');
  });

  it('TCF_006 - Login with empty password', () => {
    cy.get('[data-test="username"]').type(Cypress.env('Username'));
    cy.get('[data-test="login-button"]').click();

    cy.checkLoginError('Epic sadface: Password is required');
  });

  it('TCF_007 - Login with both fields empty', () => {
    cy.get('[data-test="login-button"]').click();

    cy.checkLoginError('Epic sadface: Username is required');
  });

  it('TCF_008 - Login with SQL injection in username', () => {
    cy.fillFields({
      '[data-test="username"]': "admin'--",
      '[data-test="password"]': 'any_password'
    });
  
    cy.get('[data-test="login-button"]').click();

    cy.checkLoginError('Epic sadface: Username and password do not match any user in this service');
  })

  it('TCUX_001 - Tab navigation between input fields', () => {
    cy.get('[data-test="username"]').focus().should('be.focused');

    cy.focused().tab();
    cy.get('[data-test="password"]').should('be.focused');

    cy.focused().tab();
    cy.get('[data-test="login-button"]').should('be.focused');
  })

  it('TCUX_002 - Password field is hidden', () => {
    cy.get('[data-test="password"]')
      .should('have.attr', 'type', 'password');
  });

  it('TCUX_003 - Login using Enter key submits the form', () => {
    cy.fillFields({
      '[data-test="username"]': Cypress.env('Username'),
      '[data-test="password"]': Cypress.env('Password'),
    });

    cy.get('[data-test="password"]').type('{enter}');

    cy.url().should('include', '/inventory.html');

    cy.get('[data-test="title"]').should('contain', 'Products');
  });
});
