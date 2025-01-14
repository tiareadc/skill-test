import { AbstractPage } from './AbstractPage';

export class ProductsPage extends AbstractPage {
  viewProductDetails = async (productId: number): Promise<void> => {
    await this.page.locator(`a[href="/product_details/${productId}"]`).click();
  }
}