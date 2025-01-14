import { AbstractPage } from './AbstractPage';

export class CheckoutPage extends AbstractPage {
  placeOrder = async (): Promise<void> => {
    await this.page.locator('a[href="/payment"]').click();
  }
}