Feature:
  As a visitor or community advocate
  I want to be able to contact the code mortals
  So that I can ask questions directly

  @SadPath
  Scenario: Sending a request, an error occurs on SendGrid
    Given there is a POST endpoint at "https://api.sendgrid.com:443/v3/mail/send" which will return "sendgrid/error.json" with a status of 400
    When I call the "SendGridContactEmail" endpoint with data:
      | name           | email               | message                   |
      | Automated Test | test@codemortals.io | This is an automated test |
    Then there should be a response that matches:
      | done  | error                                |
      | false | Permission denied, wrong credentials |

  @HappyPath
  Scenario: Sending a request, with valid data that succeeds
    Given there is a POST endpoint at "https://api.sendgrid.com:443/v3/mail/send" which will a status of 200 when called with "sendgrid/request.json"
    When I call the "SendGridContactEmail" endpoint with data:
      | name           | email               | message                   |
      | Automated Test | test@codemortals.io | This is an automated test |
    Then there should be a response that matches:
      | done |
      | true |
