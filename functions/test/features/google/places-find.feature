Feature:
  As a user looking for a location
  I want to be able to find location details with Google
  So that I can use this information to share

  @SadPath
  Scenario: Sending a request, but an error occurs on Google
    Given there is a POST endpoint at "https://maps.googleapis.com/maps/api/place/details/json" which will return "google/places/error.json" with a status of 200
    When I call the "GooglePlacesFind" endpoint with data:
      | placeId                     |
      | xxxxxxxxxxxxxxxxxxxxxxxxxxx |
    Then there should be a response that matches:
      | sessionId | error                                                                              | place  |
      | UUID      | You must use an API key to authenticate each request to Google Maps Platform APIs. | OBJECT |

  @HappyPath
  Scenario: Sending a request, with valid data that succeeds
    Given there is a POST endpoint at "https://maps.googleapis.com/maps/api/place/details/json" which will return "google/places/find-success.json" with a status of 200
    When I call the "GooglePlacesFind" endpoint with data:
      | placeId                     | sessionId                          |
      | xxxxxxxxxxxxxxxxxxxxxxxxxxx | aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaa |
    Then there should be a response that matches:
      | sessionId                          | place                                |
      | aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaa | OBJECT[id,name,address,position,url] |
    And there should be a response containing a field "place" that matches:
      | id                          | name       | address                                              | position                   | url                                              |
      | ChIJj61dQgK6j4AR4GeTYWZsKWw | Googleplex | 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA | OBJECT[latitude,longitude] | https://maps.google.com/?cid=7793879817120868320 |

  @EdgeCase
  Scenario: Sending a request, with no body data
    When I call the "GooglePlacesFind" endpoint with no data
    Then there should be a response that matches:
      | sessionId | error              |
      | UUID      | placeId is missing |
