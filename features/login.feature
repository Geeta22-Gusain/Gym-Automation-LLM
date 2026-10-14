@login
Feature: Email login
  Scenario: Existing test account logs in
    Given Fitistic is on the email login screen
    When I log in with the configured test account
    Then the Fitistic home dashboard is displayed
