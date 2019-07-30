Feature: Showing the Code Mortals upcoming events schedule

  Scenario: Open the schedule page
    Given the "/" page is open
    And expect a "POST" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "schedule/start.txt"
    And expect a "GET" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "schedule/response.txt"
    When the "Schedule" link in the "navigation" is clicked
    Then the "/schedule" page should be open

  Scenario: Ensure listing of schedule items
    Given expect a "POST" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "schedule/start.txt"
    And expect a "GET" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "schedule/response.txt"
    And the "/schedule" page is open
    Then there are 3 "event-list" entries
