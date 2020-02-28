import * as functions from 'firebase-functions';
import * as request from 'request-promise-native';
import { v4 } from 'uuid';

import { GooglePlaceSearch } from '../models';
import { CallableContext } from 'firebase-functions/lib/providers/https';

export const GooglePlacesSearch = functions.https.onCall(async (data: any, context: CallableContext): Promise<any> => {
    const sessionId = data && data.sessionId ? data.sessionId : v4();

    if (!data) {
        return { sessionId, error: 'placeName is missing' };
    }

    const value = data.placeName;
    const type = data.type || 'establishment';

    const method = 'POST';
    const uri = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    const qs = {
        key: functions.config().google.places_key,
        input: value,
        types: type,
        sessiontoken: sessionId,
    };
    const json = true;

    try {
        const response: GooglePlaceSearch = await request({ method, uri, qs, json });

        if ([ 'REQUEST_DENIED' ].includes(response.status)) {
            throw new Error(response.error_message);
        }

        const places = response.predictions.map((place) => ({ id: place.place_id, description: place.description }));
        return { sessionId, places };
    } catch (error) {
        error = error.message;
        return { sessionId, error, places: [] };
    }
});
