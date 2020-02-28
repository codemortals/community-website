Feature:
  As a user looking for a location
  I want to be able to search possible location matches with Google
  So that I can find a potential venue or address

  @SadPath
  Scenario: Sending a request, but an error occurs on Google
    Given there is a POST endpoint at "https://maps.googleapis.com/maps/api/place/autocomplete/json" which will return "google/places/error.json" with a status of 200
    When I call the "GooglePlacesSearch" endpoint with data:
      | placeName | type          |
      | google    | establishment |
    Then there should be a response that matches:
      | sessionId | error                                                                              | places |
      | UUID      | You must use an API key to authenticate each request to Google Maps Platform APIs. | []     |

  @HappyPath
  Scenario: Sending a request, with valid data that succeeds
    Given there is a POST endpoint at "https://maps.googleapis.com/maps/api/place/autocomplete/json" which will return "google/places/search-success.json" with a status of 200
    When I call the "GooglePlacesSearch" endpoint with data:
      | placeName | type          | sessionId                          |
      | google    | establishment | aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaa |
    Then there should be a response that matches:
      | sessionId                          | places   |
      | aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaa | ARRAY[2] |
    And there should be a response containing an array "places" where row 1 matches:
      | id                          | description                                              |
      | ChIJj61dQgK6j4AR4GeTYWZsKWw | Googleplex, Amphitheatre Parkway, Mountain View, CA, USA |

  @EdgeCase
  Scenario: Sending a request, use the default type
    Given there is a POST endpoint at "https://maps.googleapis.com/maps/api/place/autocomplete/json" which will return "google/places/search-success.json" with a status of 200
    When I call the "GooglePlacesSearch" endpoint with data:
      | placeName | sessionId                          |
      | google    | aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaa |
    Then there should be a response that matches:
      | sessionId                          | places   |
      | aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaa | ARRAY[2] |

  @EdgeCase
  Scenario: Sending a request, with no body data
    When I call the "GooglePlacesSearch" endpoint with no data
    Then there should be a response that matches:
      | sessionId | error                |
      | UUID      | placeName is missing |
