Feature: Show/Hide Event Details

  Scenario: Event element is collapsed by default
    Given the list of events has been loaded
    When the user hasn’t clicked the “Show details” button
    Then the event element is collapsed by default

  Scenario: User can expand an event to see its details
    Given the list of events has been loaded
    When the user clicks on the “Show Details” button
    Then the event element expands showing the event details

  Scenario: User can collapse an event to hide its details
    Given the list of events has been loaded
    And the event element is expanded showing details
    When the user clicks on the “Hide Details” button
    Then the event element collapses hiding the event details
