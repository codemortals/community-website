import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserProfile } from '@cm/services/models';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    public retrieve(userId): Observable<UserProfile> {
        return this.firestore.collection<UserProfile>('users').doc<UserProfile>(userId).valueChanges();
    }

    public update(profile: UserProfile): Observable<UserProfile> {
        const query = this.firestore.collection<UserProfile>('users').doc<UserProfile>(profile.uid).set(profile, { merge: true });
        return from(query).pipe(mergeMap(() => this.retrieve(profile.uid)));
    }

}
