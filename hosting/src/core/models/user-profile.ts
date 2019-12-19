import * as firebase from 'firebase';

import { GooglePlace } from './google-place-find';

export interface UserProfile {
    uid: string;
    alias: string;
    introduction?: string;
    role?: string;
    email: string;
    avatar: string;
    location?: GooglePlace;
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
