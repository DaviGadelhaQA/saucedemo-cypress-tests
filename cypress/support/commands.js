Cypress.Commands.add('fillFields', (fields) => {
  Object.entries(fields).forEach(([selector, value = ""]) => {
    cy.get(selector).type(value);
  });
});

Cypress.Commands.add('login', () => {
  cy.fillFields({
    '[data-test="username"]': Cypress.env('Username'),
    '[data-test="password"]': Cypress.env('Password'),
  });

  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('loginWithTrimmedCredentials', () => {
  cy.fillFields({
    '[data-test="username"]': `  ${Cypress.env('Username')}  `,
    '[data-test="password"]': `  ${Cypress.env('Password')}  `,
  });
  
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('checkLoginError', (message) => {
  cy.log(`Expected error message: "${message}"`);
  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', message);
});


