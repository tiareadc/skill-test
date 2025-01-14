import { chromium, Browser, Page } from 'playwright';
import { strict as assert } from 'assert';
import { NavbarPage } from '../pages/NavbarPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { SignupPage } from '../pages/SignupPage';
import { PaymentPage } from '../pages/PaymentPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../test-data/testData';

let browser: Browser;
let page: Page;
let navbarPage: NavbarPage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;
let cartPage: CartPage;
let signupPage: SignupPage;
let paymentPage: PaymentPage;
let checkoutPage: CheckoutPage;
const baseURL = process.env.BASE_URL;

describe('Automation Exercise Test', () => {
  before(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    navbarPage = new NavbarPage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);
    signupPage = new SignupPage(page);
    paymentPage = new PaymentPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  it('Add product to cart and complete', async () => {
    // Generate random data using TestData
    const user = testData.generateUser();
    const creditCard = testData.generateCreditCard();
    const quantity = testData.generateQuantity();

    // Navigate through the application and add a product to the cart
    await page.goto(baseURL!);
    await navbarPage.goToProducts();
    await productsPage.viewProductDetails(3);
    await productDetailsPage.addToCart(quantity);
    await cartPage.proceedToCheckout();
    await cartPage.goToRegisterLogin();

    // Register a new user
    await signupPage.fillSignupForm(user.fullName, user.email);
    await signupPage.completeSignup(
      user.password,
      user.fullName.split(' ')[0],
      user.fullName.split(' ')[1] || '',
      user.address,
      user.state,
      user.city,
      user.zipCode,
      user.phoneNumber
    );
    assert(await page.locator('[data-qa="account-created"]').isVisible(), 'Account created message should be visible');

    // Checkout and place an order
    await navbarPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await paymentPage.completePayment(
      user.fullName,
      creditCard.number,
      creditCard.cvv,
      creditCard.expiryMonth.toString(),
      creditCard.expiryYear.toString()
    );
    assert(await page.locator('[data-qa="order-placed"]').isVisible(), 'Order placed message should be visible');

    // Logout
    await navbarPage.logout();
    const currentUrl = page.url();
    assert.equal(currentUrl, baseURL! + 'login', 'URL should be the login page');
  });
  
  after(async () => {
    await browser.close();
  });
});