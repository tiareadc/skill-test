import { AbstractPage } from './AbstractPage';

export class CartPage extends AbstractPage {
  proceedToCheckout = async (): Promise<void> => {
    await this.page.locator('text=Proceed To Checkout').click();
  }

  goToRegisterLogin = async (): Promise<void> => {
    await this.page.locator('.modal-body >> a[href="/login"]').click();
  }
}