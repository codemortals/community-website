import * as firebase from 'firebase';

export interface UserProfile {
    uid: string;
    alias: string;
    email: string;
    avatar: string;
    social?: {
        github?: string;
        twitter?: string;
        youtube?: string;
        facebook?: string;
        linkedin?: string;
        instagram?: string;
    };
    since: firebase.firestore.Timestamp;
}
