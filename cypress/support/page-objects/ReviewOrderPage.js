class ReviewOrderPage {
	continueToPayment() {
		const button = cy.get(
			"div.layout__region.layout__region--first > div > section.block.block-go-commerce.block-react-checkout-payment-segue.clearfix.block-wrapper > div > div > div > div > div > div > a"
		);
		button.click();
		return this;
	}

	selectDate(date) {
		cy.get(`div.travel-date--datepicker > input`)
			.invoke("val")
			.then((date) => {
				expect(date).to.equal(date);
			});
	}
}

export default ReviewOrderPage;
