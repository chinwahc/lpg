class Cart {
	viewCart() {
		const button = cy.get(
			`#block-secondarylinks > div > div > div > div > div > div.react-component > div > div`
		);
		button.click();
		return this;
	}
}
export default Cart;
