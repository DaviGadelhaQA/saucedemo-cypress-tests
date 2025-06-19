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

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  it("TCF_003 - Login with invalid username and valid password", () => {
    cy.fillFields({
      '[data-test="username"]': 'invalid_user',
      '[data-test="password"]': Cypress.env('Password'),
    });

    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
});
