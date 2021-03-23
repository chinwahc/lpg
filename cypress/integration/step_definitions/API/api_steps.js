import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
const chai = require("chai");
expect = chai.expect;
chai.use(require("chai-sorted"));
const urls = {
	mock: `${Cypress.config("mockServerUrl")}`,
	api: `${Cypress.config("apiUrl")}`
};
const endpoints = ["citys", "attractions"];
const contentType = "application/json";
const method = "GET";
const params = {
	cities: {
		"New York": 1,
		"London": 2,
		"Los Angeles": 3,
		"Sydney": 4,
		"Paris": 5,
		"Wakanda": 9
	},
	filters: {
		museum: "MUSEUM",
		tour: "TOUR",
		observatory: "OBSERVATORY",
		unknown: "UNKNOWN",
		invalid: "invalid"
	},
	sort: {
		id: "id",
		cityId: "cityId",
		title: "title",
		rating: "rating",
		invalid: "invalid"
	},
	order: { ascending: "asc", descending: "desc", invalid: "invalid" }
};

Given(/^I call the cities end point$/, () => {
	cy.request({
		method: method,
		url: `${urls.api}/${endpoints[0]}`,
		headers: {
			"Content-Type": contentType
		},
		failOnStatusCode: false
	}).as("getActual");
});

When(/^I call the attractions end point for city "([^"]*)"$/, (city) => {
	cy.request({
		method: method,
		url: `${urls.api}/${endpoints[1]}`,
		qs: { cityId: params.cities[city] },
		headers: {
			"Content-Type": contentType
		},
		failOnStatusCode: false
	}).as("getActual");
});

When(
	/^I call the attractions end point for city "([^"]*)" with filter "([^"]*)" sorted by "([^"]*)" in "([^"]*)" order$/,
	(city, filter, sort, order) => {
		cy.request({
			method: method,
			url: `${urls.api}/${endpoints[1]}`,
			qs: {
				cityId: params.cities[city],
				type: params.filters[filter],
				_sort: params.sort[sort],
				_order: params.order[order]
			},
			headers: {
				"Content-Type": contentType
			},
			failOnStatusCode: false
		}).as("getActual");
	}
);

Then(/^I expect the response code to be "([^"]*)"$/, (statusCode) => {
	statusCode = parseInt(statusCode, 10);
	cy.get("@getActual").should((response) => {
		expect(response["status"]).to.eq(statusCode);
	});
});

Then(/^I expect the status text to be "([^"]*)"$/, (statusText) => {
	cy.get("@getActual").should((response) => {
		expect(response["statusText"]).to.eq(statusText);
	});
});

Then(/^I expect the response to contain all cities$/, () => {
	cy.request({
		method: method,
		url: `${urls.mock}/${endpoints[0]}`,
		headers: {
			"Content-Type": contentType
		},
		failOnStatusCode: false
	}).then((expected) => {
		cy.get("@getActual").should((actual) => {
			const expectedCities = expected["body"];
			const actualCities = actual["body"];
			expect(actualCities).to.deep.eq(
				expectedCities,
				`Expected response:'${JSON.stringify(
					expectedCities
				)}'. \n  Actual response: '${JSON.stringify(actualCities)}'`
			);
		});
	});
});

Then(
	/^I expect the response to have all attractions for "([^"]*)"$/,
	(city) => {
		cy.request({
			method: method,
			url: `${urls.mock}/${endpoints[1]}`,
			qs: { cityId: params.cities[city] },
			headers: {
				"Content-Type": contentType
			},
			failOnStatusCode: false
		}).then((expected) => {
			cy.get("@getActual").should((actual) => {
				const expectedAttractions = expected["body"];
				const actualAttractions = actual["body"];
				expect(actualAttractions).to.deep.eq(
					expectedAttractions,
					`Expected response:'${JSON.stringify(
						expectedAttractions
					)}'. \n  Actual response: '${JSON.stringify(actualAttractions)}'`
				);
			});
		});
	}
);

Then(
	/^I expect the response to have all attractions for city "([^"]*)" with filter "([^"]*)" sorted by "([^"]*)" in "([^"]*)" order$/,
	(city, filter, sort, order) => {
		cy.request({
			method: method,
			url: `${urls.mock}/${endpoints[1]}`,
			qs: {
				cityId: params.cities[city],
				type: params.filters[filter],
				_sort: params.sort[sort],
				_order: params.order[order]
			},
			headers: {
				"Content-Type": contentType
			},
			failOnStatusCode: false
		}).then((expected) => {
			cy.get("@getActual").should((actual) => {
				const expectedAttractions = expected["body"];
				const actualAttractions = actual["body"];
				expect(actualAttractions)
					.to.be.sortedBy(`${params.sort[sort]}`, { descending: true })
					.to.deep.eq(
						expectedAttractions,
						`Expected response:'${JSON.stringify(
							expectedAttractions
						)}'. \n  Actual response: '${JSON.stringify(actualAttractions)}'`
					);
			});
		});
	}
);

Then(/^I expect the response to not contain any data$/, () => {
	cy.get("@getActual").should((actual) => {
		const actualAttractions = actual["body"];
		expect(actualAttractions).to.be.empty;
	});
});
