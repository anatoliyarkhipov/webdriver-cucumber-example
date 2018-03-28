Feature: Searching for cats

  @funny @cats
  Scenario: User can use Google to search cats
    Given I am on the google page
    When I search for "funny music cats"
    Then I see that results contain:
      | 1 | cats  |
      | 2 | funny |
      | 3 | music |
