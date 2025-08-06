import { cartPage } from "../../pageObjects/cartPage";

describe("Cart Funcionality", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.fixture("products").as('productData');
  });

  describe('Success Scenarios', () => {
    it('TCF_001 - Add one item to the cart', () => {
      cy.addProductToCart(cartPage.addBackpack);
      cy.get(cartPage.badge).should('contain', '1');
    });

    it('TCF_003 - Access cart page via cart icon', () => {
      cy.goToCart();
      cy.url().should('contain', 'cart.html');
      cy.get(cartPage.cartTitle).should('contain', 'Your Cart');
    });

    it('TCF_005 - Continue Shopping redirects to inventory', () => {
      cy.goToCart();
      cy.get(cartPage.continueShoppingButtton).click();

      cy.url().should('contain', 'inventory.html')
    });
  });

  describe('Alternative Flows', () => {
    it('TCF_002 - Remove item from cart', () => {
      cy.addProductToCart(cartPage.addBackpack);

      cy.goToCart();

      cy.url().should('contain', 'cart.html');

      cy.removeProductFromCart(cartPage.removeBackpack);

      cy.get(cartPage.badge).should('not.exist');

      cy.get(cartPage.cartItem).should('not.exist');
    });
  });

  describe('UX/UI', () => {
    it('TCUX_001 - Check cart details on cart page', function () {
      cy.addProductToCart(cartPage.addBackpack);
      cy.goToCart();

      cy.get(cartPage.cartItem).should('exist');
      cy.get(cartPage.itemQuantity).should('contain', '1');
      cy.get(cartPage.titleProduct).should('contain', this.productData.backpack.name);
      cy.get(cartPage.itemPrice).should('contain', this.productData.backpack.price);
      cy.get(cartPage.removeBackpack).should('be.visible');
    });
  });
});
