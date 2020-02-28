import * as firebase from 'firebase';

export interface GooglePlace {
    id: string;
    name: string;
    address: string;
    position: firebase.firestore.GeoPoint;
    url: string;
}

export interface GooglePlaceFind {
    sessionId: string;
    place: GooglePlace;
}
