import { cartPage } from "../../pageObjects/cartPage";

Cypress.Commands.add('addProductToCart', (selector) => {
    cy.get(selector).click();
});

Cypress.Commands.add('removeProductFromCart', (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add('goToCart', () => {
  cy.get(cartPage.shoppingCart).click();
});