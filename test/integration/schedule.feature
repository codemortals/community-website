Feature: Showing the Code Mortals upcoming events schedule

  Scenario: Open the schedule page
    Given the "/" page is open
    When the "Schedule" link in the "navigation" is clicked
    Then the "/schedule" page should be open
