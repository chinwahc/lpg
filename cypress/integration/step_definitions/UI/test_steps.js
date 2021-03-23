import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import AllInclusivePage from "../../../support/page-objects/AllInclusivePage";
import Cart from "../../../support/page-components/Cart";
import ReviewOrderPage from "../../../support/page-objects/ReviewOrderPage";
import PaymentPage from "../../../support/page-objects/PaymentPage";
const reviewOrderPage = new ReviewOrderPage();
const cart = new Cart();
const allInclusivePage = new AllInclusivePage();
const paymentPage = new PaymentPage();

beforeEach(() => {
	cy.log(`Clearing session storage & local storage...`);
	cy.clearCookies();
	cy.clearLocalStorage().then(() => {
		cy.window().then((win) => {
			win.sessionStorage.clear();
		});
	});
	cy.reload();
});

Given(/^I navigate to the all inclusive page$/, () => {
	allInclusivePage.visit();
});

Given(
	/^I select a "([^"]*)" day pass for "([^"]*)" adults and "([^"]*)" kids$/,
	(pass, noOfAdults, noOfKids) => {
		const passTypes = {
			1: "Bos_Prod_Go_d1",
			2: "Bos_Prod_Go_d2",
			3: "Bos_Prod_Go_d3",
			5: "Bos_Prod_Go_d5",
			7: "Bos_Prod_Go_d7"
		};
		const adults = parseInt(noOfAdults, 10);
		const kids = parseInt(noOfKids, 10);

		allInclusivePage.choosePass(passTypes[pass]);
		allInclusivePage.addAdult(adults);
		allInclusivePage.addChild(kids);
		allInclusivePage.checkout();
	}
);

Given(/^I select date "([^"]*)" and continue to payment page$/, (date) => {
	reviewOrderPage.selectDate(date);
	reviewOrderPage.continueToPayment();
});

Given(/^I select payment method "([^"]*)"$/, (method) => {
	paymentPage.choosePaymentMethod(method);
});

Given(/^I enter email "([^"]*)"$/, (email) => {
	paymentPage.setEmail(email);
});

Given(
	/^I enter card details "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)"$/,
	(cardNumber, month, year, securityCode) => {
		paymentPage.setCardNumber(cardNumber);
		paymentPage.setExpiry(month, year);
		paymentPage.setSecurityCode(securityCode);
	}
);

Given(
	/^I enter personal details: first name "([^"]*)", last name, "([^"]*)" and phone number "([^"]*)"$/,
	(fName, lName, phone) => {
		paymentPage.setDetails(fName, lName, phone);
	}
);

Given(
	/^I enter billing address: first line "([^"]*)", second line, "([^"]*)" city "([^"]*)", country "([^"]*)", state "([^"]*)" and post code "([^"]*)"$/,
	(firstLine, secondLine, city, country, state, postcode) => {
		paymentPage.setBillingAddress(
			firstLine,
			secondLine,
			country,
			city,
			state,
			postcode
		);
	}
);

Given(/^I agree to the terms and conditions$/, () => {
	paymentPage.agreeTermsAndConditions();
});

Given(/^I confirm and pay$/, () => {
	paymentPage.confirmOrderAndPay();
});

Given(/^I select the sign me up checkbox$/, () => {
	paymentPage.signMeUp();
});

When("I open the cart", () => {
	cart.viewCart();
});
