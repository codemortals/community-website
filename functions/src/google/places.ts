import * as functions from 'firebase-functions';
import * as request from 'request-promise-native';
import { v4 } from 'uuid';

import { GooglePlaceFind, GooglePlaceSearch } from '../models';
import { CallableContext } from 'firebase-functions/lib/providers/https';

export const GooglePlacesSearch = functions.https.onCall(async (data: any, context: CallableContext): Promise<any> => {
    const uid = data.sessionId ? data.sessionId : v4();
    const value = data.placeName;
    const type = data.type;

    const method = 'POST';
    const uri = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    const qs = {
        key: functions.config().google.places_key,
        input: value,
        types: type,
        sessiontoken: uid,
    };
    const json = true;

    try {
        const response: GooglePlaceSearch = await request({ method, uri, qs, json });
        const places = response.predictions.map((place) => ({ id: place.place_id, description: place.description }));
        return { uid, places };
    } catch (error) {
        error = error.message;
        return { uid, error };
    }
});

export const GooglePlacesFind = functions.https.onCall(async (data: any, context: CallableContext): Promise<any> => {
    const uid = data.sessionId ? data.sessionId : v4();
    const placeId = data.placeId;

    if (!placeId) {
        return { uid };
    }

    const method = 'POST';
    const uri = 'https://maps.googleapis.com/maps/api/place/details/json';
    const qs = {
        key: functions.config().google.places_key,
        place_id: placeId,
        sessiontoken: uid,
        fields: [ 'place_id', 'name', 'formatted_address', 'geometry', 'url' ].join(','),
    };
    const json = true;

    try {
        const response: GooglePlaceFind = await request({ method, uri, qs, json });

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
        return { uid, place };
    } catch (error) {
        error = error.message;
        return { uid, error };
    }
});
