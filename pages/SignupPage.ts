import { AbstractPage } from './AbstractPage';

export class SignupPage extends AbstractPage {
  fillSignupForm = async (name: string, email: string): Promise<void> => {
    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);
    await this.page.locator('[data-qa="signup-button"]').click();
  }

  completeSignup = async (
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    state: string,
    city: string,
    zipCode: string,
    mobile: string
  ): Promise<void> => {
    await this.page.locator('[data-qa="password"]').fill(password);
    await this.page.locator('[data-qa="days"]').selectOption({ value: '1' });
    await this.page.locator('[data-qa="months"]').selectOption({ value: '3' });
    await this.page.locator('[data-qa="years"]').selectOption({ value: '1990' });
    await this.page.locator('[data-qa="first_name"]').fill(firstName);
    await this.page.locator('[data-qa="last_name"]').fill(lastName);
    await this.page.locator('[data-qa="address"]').fill(address);
    await this.page.locator('[data-qa="country"]').selectOption({ value: 'United States' });
    await this.page.locator('[data-qa="state"]').fill(state);
    await this.page.locator('[data-qa="city"]').fill(city);
    await this.page.locator('[data-qa="zipcode"]').fill(zipCode);
    await this.page.locator('[data-qa="mobile_number"]').fill(mobile);
    await this.page.locator('[data-qa="create-account"]').click();
  }
}