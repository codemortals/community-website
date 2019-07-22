import * as firebase from 'firebase';

export interface Event {
    type: 'stream' | 'meetup' | 'conference' | 'hackathon';
    title: string;
    link: string;
    dateStart: firebase.firestore.Timestamp;
    dateEnd: firebase.firestore.Timestamp;
}
