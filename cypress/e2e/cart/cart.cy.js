import { cartPage } from "../../pageObjects/cartPage";

describe("Cart Funcionality", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.fixture("products").as('productData');
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

  it('TCF_004 - Check cart details on cart page', function () {
      cy.addProductToCart(cartPage.addBackpack);
      cy.goToCart();

      cy.get(cartPage.cartItem).should('exist');
      cy.get(cartPage.itemQuantity).should('contain', '1');
      cy.get(cartPage.titleProduct).should('contain', this.productData.backpack.name);
      cy.get(cartPage.itemPrice).should('contain', this.productData.backpack.price);
      cy.get(cartPage.removeBackpack).should('be.visible');
  });

  it.only('TC_005 Should navigate to inventory page when clicking "Continue Shopping" button', () => {
    cy.goToCart();
    cy.get(cartPage.continueShoppingButtton).click();

    cy.url().should('contain', 'inventory.html')
  });
});
