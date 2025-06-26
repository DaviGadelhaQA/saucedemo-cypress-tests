import { cartPage } from "../../pageObjects/cartPage";

describe("Cart Funcionality", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('TCF_001 - Should add the Sauce labs backpack to the cart and show badge with 1 item', () => {
    cy.addProductToCart(cartPage.addBackpack);
    cy.get(cartPage.badge).should('contain', '1');
  });

  it('TCF_002 - Should remove Sauce labs backpack from the cart', () => {
    cy.addProductToCart(cartPage.addBackpack);
    
    cy.goToCart();

    cy.url().should('contain', 'cart.html');

    cy.removeProductFromCart(cartPage.removeBackpack);

    cy.get(cartPage.badge).should('not.exist');

    cy.get(cartPage.cartItem).should('not.exist');
  });

  it('TCF_003 - Should access cart page via cart icon', () => {
    cy.goToCart();
    cy.url().should('contain', 'cart.html');
    cy.get(cartPage.cartTitle).should('contain', 'Your Cart');
  });
});
