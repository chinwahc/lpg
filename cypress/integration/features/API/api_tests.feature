@API
Feature: API Tests - LPG Tech Challenge - Chituru Chinwah

  Scenario: Verify user is able to get all cities
    Given I call the cities end point
    Then I expect the response code to be "200"
    And I expect the status text to be "OK"
    And I expect the response to contain all cities


  Scenario: Verify user is able to get all attractions for city New York
    Given I call the attractions end point for city "New York"
    Then I expect the response code to be "200"
    And I expect the status text to be "OK"
    And I expect the response to have all attractions for "New York"


  Scenario: Verify empty response when user sends request for city that does not have attractions
    Given I call the attractions end point for city "Wakanda"
    Then I expect the response code to be "200"
    And I expect the status text to be "OK"
    And I expect the response to not contain any data


  Scenario: Verify user is able to get all Museum attractions for city New York ordered by rating in descending order
    Given I call the attractions end point for city "New York" with filter "museum" sorted by "rating" in "descending" order
    Then I expect the response code to be "200"
    And I expect the status text to be "OK"
    And I expect the response to have all attractions for city "New York" with filter "museum" sorted by "rating" in "descending" order


    Scenario: Verify response when invalid filter is parsed
    Given I call the attractions end point for city "New York" with filter "invalid" sorted by "rating" in "descending" order
    Then I expect the response code to be "200"
    And I expect the status text to be "OK"
    And I expect the response to not contain any data






