import { AbstractPage } from './AbstractPage';

export class PaymentPage extends AbstractPage {
  completePayment = async (
    fullName: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string
  ): Promise<void> =>  {
    await this.page.locator('[data-qa="name-on-card"]').fill(fullName);
    await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(expiryYear);
    await this.page.locator('[data-qa="pay-button"]').click();
  }
}