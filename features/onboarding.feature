@onboarding
Feature: Profile setup after Google signup
  # Manually select a NEW dedicated Google test account before running.
  Scenario: Complete profile setup from Terms and Guidelines
    Given Fitistic is on the terms screen after Google signup
    When I accept the terms and continue
    And I choose Build Muscle and Strength
    And I enter a height of 175 cm and weight of 70 kg
    Then the calculated BMI is 22.9
    When I continue to activity selection
    And I select Moderately Active and complete setup
    Then the Fitistic home dashboard is displayed
