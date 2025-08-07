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

    it('TCF_004 - Add multiple items to the cart', () => {
      const productsToAdd = {
        backpack: cartPage.addBackpack,
        bike: cartPage.addBikeLight,
        T_Shirt: cartPage.addT_Shirt
      }

      cy.addMultipleItems(productsToAdd);

      cy.get(cartPage.badge).should('contain', Object.keys(productsToAdd).length);
    });

    it('TCF_005 - Continue Shopping redirects to inventory', () => {
      cy.goToCart();
      cy.get(cartPage.continueShoppingButtton).click();

      cy.url().should('contain', 'inventory.html')
    });

    it('TCF_006 - Navigate to Checkout from cart', function() {
      cy.addProductToCart(cartPage.addBackpack);
      cy.goToCart();

      cy.get(cartPage.checkoutButton).click();
      cy.url().should('include', 'checkout')
    });

    it('TCF_007 - Add and remove multiple items', function () {
      const productsToAdd = {
        backpack: cartPage.addBackpack,
        bike: cartPage.addBikeLight,
        T_Shirt: cartPage.addT_Shirt
      }

      const productsToRemove = {
        backpack: cartPage.removeBackpack,
        bike: cartPage.removeBikeLight,
        T_Shirt: cartPage.removeT_Shirt
      }

      cy.addMultipleItems(productsToAdd);
      cy.removeMultipleItems(productsToRemove);

      cy.get(cartPage.badge).should('not.exist');
      cy.get(cartPage.cartItem).should('not.exist');
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
