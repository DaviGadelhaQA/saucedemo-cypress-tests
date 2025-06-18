describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Should log in successfully", () => {
    cy.get('[data-test="username"]').type(Cypress.env('Username'));
    cy.get('[data-test="password"]').type(Cypress.env('Password'));
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('contain', 'Products');
  });
});
