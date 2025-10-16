Feature: Specify Number of Events

  Scenario: When the user hasn’t specified a number, 32 is the default
    Given the app is loaded
    When the user hasn’t changed the number of events
    Then the default number of events displayed should be 32

  Scenario: User can change the number of events displayed
    Given the app is loaded
    When the user changes the number of events to 10
    Then the app should display 10 events
