import { AbstractPage } from './AbstractPage';

export class NavbarPage extends AbstractPage {
  goToProducts = async (): Promise<void> => {
    await this.page.locator('a[href="/products"]').click();
  }

  goToCart = async (): Promise<void> => {
    await this.page.locator('a[href="/view_cart"]').click();
  }

  logout = async (): Promise<void> => {
    await this.page.locator('a[href="/logout"]').click();
  }
}