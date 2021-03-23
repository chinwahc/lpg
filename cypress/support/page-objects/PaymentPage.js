class PaymentPage {
	visit() {
		cy.visit(
			"https://gocity.com/boston/en-us/products/all-inclusive/checkout/payment"
		);
	}

	signMeUp() {
		const checkbox = cy.get(`#checkout-form-subscription`);
		checkbox.check();
		return this;
	}

	choosePaymentMethod(method) {
		const cardButton = cy.get(`div > div > ul > li.card-button.active > span`);
		const paypalButton = cy.get(`li.paypal-button.false > span`);
		return method === "card" ? cardButton.click() : paypalButton.click();
	}

	setEmail(email) {
		const field = cy.get(`#checkout-form-email`);
		field.clear();
		field.type(email);
		return this;
	}

	setDetails(firstName, lastName, phoneNumber) {
		const fName = cy.get(`#checkout-form-first-name`);
		fName.clear();
		fName.type(firstName);

		const lName = cy.get(`#checkout-form-last-name`);
		lName.clear();
		lName.type(lastName);

		const number = cy.get(`#checkout-form-phone-number`);
		number.clear();
		number.type(phoneNumber);

		return this;
	}

	setBillingAddress(
		firstLine,
		secondLine,
		countryCode,
		city,
		stateCode,
		postcode
	) {
		cy.get(
			"form > div:nth-child(4) > div > div.checkout-form__item.checkout-form__address-finder > div.checkout-form__address-finder-manually"
		).click();

		const firstLineAddress = cy.get("#checkout-form-street");
		firstLineAddress.clear();
		firstLineAddress.type(firstLine);

		const secondLineAddress = cy.get("#checkout-form-address");
		secondLineAddress.clear();
		secondLineAddress.type(secondLine);

		const cityInput = cy.get("#checkout-form-city");
		cityInput.clear();
		cityInput.type(city);

		const zipcode = cy.get("#checkout-form-city");
		zipcode.clear();
		zipcode.type(postcode);

		const countryDropdown = cy.get("#checkout-form-country");
		countryDropdown
			.select(countryCode, { force: true })
			.should("have.value", countryCode);

		const stateDropdown = cy.get("#checkout-form-state");
		stateDropdown
			.select(stateCode, { force: true })
			.should("have.value", stateCode);

		return this;
	}

	agreeTermsAndConditions() {
		const checkbox = cy.get(`#checkout-form-terms`);
		checkbox.check();
		return this;
	}

	setCardNumber(cardNumber) {
		const field = cy.get(`#credit-card-number`);
		field.clear();
		field.type(cardNumber);
		return this;
	}

	setExpiry(month, year) {
		const monthField = cy.get(`#expiration-month`);
		monthField.clear();
		monthField.type(month);

		const yearField = cy.get(`#expiration-year`);
		yearField.clear();
		yearField.type(year);

		return this;
	}

	setSecurityCode(code) {
		const field = cy.get(`#cvv`);
		field.clear();
		field.type(code);
		return this;
	}

	confirmOrderAndPay() {
		const button = cy.get(`#confirmOrderAndPay`);
		button.click();
	}
}

export default PaymentPage;
