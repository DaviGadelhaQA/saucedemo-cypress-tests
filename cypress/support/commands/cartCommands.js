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

Cypress.Commands.add('addMultipleItems', (products) => {
  Object.entries(products).forEach(([key, selector]) => {
    cy.addProductToCart(selector);
  });
});

Cypress.Commands.add('removeMultipleItems', (products) => {
  Object.entries(products).forEach(([key, selector]) => {
    cy.removeProductFromCart(selector);
  });
});