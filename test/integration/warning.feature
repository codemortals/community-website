Feature: The site should support some warning pages to handle errors

  Scenario: Page not found warning
    Given the "/missing" page is open
    Then a level 2 header containing "Error 404: Page Not Found" should be present
