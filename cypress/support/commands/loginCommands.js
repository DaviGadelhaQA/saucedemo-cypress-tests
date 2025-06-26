import { loginPage } from '../../pageObjects/loginPage';

Cypress.Commands.add('fillFields', (fields) => {
  Object.entries(fields).forEach(([selector, value]) => {
    cy.get(selector).type(value);
  });
});

Cypress.Commands.add('login', () => {
  cy.fillFields({
    [loginPage.usernameInput]: Cypress.env('Username'),
    [loginPage.passwordInput]: Cypress.env('Password'),
  });

  cy.get(loginPage.loginButton).click();
});

Cypress.Commands.add('loginWithTrimmedCredentials', () => {
  cy.fillFields({
    [loginPage.usernameInput]: `  ${Cypress.env('Username')}  `,
    [loginPage.passwordInput]: `  ${Cypress.env('Password')}  `,
  });
  
  cy.get(loginPage.loginButton).click();
});

Cypress.Commands.add('checkLoginError', (message) => {
  cy.get(loginPage.errorMessage)
    .should('be.visible')
    .and('contain', message);
});




