import { AbstractPage } from './AbstractPage';

export class ProductDetailsPage extends AbstractPage {
  addToCart = async (quantity: number): Promise<void> => {
    await this.page.locator('#quantity').clear();
    await this.page.locator('#quantity').fill(quantity.toString());
    await this.page.locator('text=Add to cart').click();
    await this.page.locator('.modal-body >> a[href="/view_cart"]').click();
  }
}