class AllInclusivePage {
	visit() {
		cy.visit("https://gocity.com/boston/en-us/products/all-inclusive");
	}

	choosePass(passType) {
		const dropdown = cy.get("div.lc-products-list__wrapper > div > select");
		dropdown.select(passType, { force: true }).should("have.value", passType);
		return this;
	}

	addAdult(numberOfAdults) {
		const button = cy.get(
			"div:nth-child(3) > div.lc-cart__item-amount-wrapper > div > div.lc-cart__item-amount-plus"
		);
		for (let n = 0; n < numberOfAdults; n++) {
			button.click();
		}
	}

	removeAdult(numberOfAdults) {
		const button = cy.get(
			"div.lc-cart__items > div:nth-child(3) > div.lc-cart__item-amount-wrapper > div > div.lc-cart__item-amount-minus"
		);
		for (let n = 0; n < numberOfAdults; n++) {
			button.click();
		}
	}

	addChild(numberOfChildren) {
		const button = cy.get(
			"div.lc-cart.lc-cart--dropdown-cart > div > div.lc-cart__items > div:nth-child(4) > div.lc-cart__item-amount-wrapper > div > div.lc-cart__item-amount-plus"
		);
		for (let n = 0; n < numberOfChildren; n++) {
			button.click();
		}
	}

	removeChild(numberOfChildren) {
		const button = cy.get(
			"div.lc-cart__items > div:nth-child(4) > div.lc-cart__item-amount-wrapper > div > div.lc-cart__item-amount-minus"
		);
		for (let n = 0; n < numberOfChildren; n++) {
			button.click();
		}
	}

	checkout() {
		const button = cy.get("div.lc-cart__prices.lc-cart__loader > a");
		button.click();
		return this;
	}
}
export default AllInclusivePage;
