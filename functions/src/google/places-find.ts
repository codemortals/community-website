import * as functions from 'firebase-functions';
import * as request from 'request-promise-native';
import { v4 } from 'uuid';

import { GooglePlaceFind } from '../models';
import { CallableContext } from 'firebase-functions/lib/providers/https';

export const GooglePlacesFind = functions.https.onCall(async (data: any, context: CallableContext): Promise<any> => {
    const sessionId = data && data.sessionId ? data.sessionId : v4();

    if (!data) {
        return { sessionId, error: 'placeId is missing' };
    }

    const placeId = data.placeId;

    const method = 'POST';
    const uri = 'https://maps.googleapis.com/maps/api/place/details/json';
    const qs = {
        key: functions.config().google.places_key,
        place_id: placeId,
        sessiontoken: sessionId,
        fields: [ 'place_id', 'name', 'formatted_address', 'geometry', 'url' ].join(','),
    };
    const json = true;

    try {
        const response: GooglePlaceFind = await request({ method, uri, qs, json });

        if ([ 'REQUEST_DENIED' ].includes(response.status)) {
            throw new Error(response.error_message);
        }

        const place = {
            id: response.result.place_id,
            name: response.result.name,
            address: response.result.formatted_address,
            position: {
                latitude: response.result.geometry.location.lat,
                longitude: response.result.geometry.location.lng,
            },
            url: response.result.url,
        };
        return { sessionId, place };
    } catch (error) {
        error = error.message;
        return { sessionId, error, place: {} };
    }
});
