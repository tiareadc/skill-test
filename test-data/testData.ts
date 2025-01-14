import { faker } from '@faker-js/faker';

export class testData {
  static generateUser() {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 20 }),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    };
  }

  static generateCreditCard() {
    const futureDate = faker.date.future();
    return {
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      expiryMonth: futureDate.getMonth() + 1,
      expiryYear: futureDate.getFullYear(),
    };
  }

  static generateQuantity(min: number = 1, max: number = 20) {
    return faker.number.int({ min, max });
  }
}