import * as firebase from 'firebase';

import { GooglePlace } from './google-place-find';

export interface Event {
    uid: string;
    type: 'stream' | 'meetup' | 'conference' | 'hackathon' | 'workshop';
    title: string;
    image: string;
    website: string;
    summary: string;
    venue: GooglePlace;
    dates: Array<{
        start: firebase.firestore.Timestamp;
        end: firebase.firestore.Timestamp;
    }>;
    dateStart: firebase.firestore.Timestamp;
    dateEnd: firebase.firestore.Timestamp;
    organisers: Array<{ alias: string, avatar: string } | string>;
}
