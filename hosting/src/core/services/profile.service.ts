import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserProfile } from '@cm/models';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    public retrieve(userId: string): Observable<UserProfile> {
        return this.firestore.collection<UserProfile>('users').doc<UserProfile>(userId).valueChanges();
    }

    public update(profile: UserProfile): Observable<UserProfile> {
        if (profile.location) {
            profile.location.position = new firebase.firestore.GeoPoint(profile.location.position.latitude, profile.location.position.longitude);
        }

        const query = this.firestore.collection<UserProfile>('users').doc<UserProfile>(profile.uid).set(profile, { merge: true });
        return from(query).pipe(mergeMap(() => this.retrieve(profile.uid)));
    }

}
