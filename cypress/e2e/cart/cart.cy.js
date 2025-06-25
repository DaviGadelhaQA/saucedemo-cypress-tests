import { cartPage } from "../../pageObjects/cartPage";

describe("Cart Funcionality", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Should add the Sauce labs backpack to the cart and show badge with 1 item', () => {
    cy.addProductToCart(cartPage.addBackpack);
    cy.get(cartPage.badge).should('contain', '1');
  })

});
