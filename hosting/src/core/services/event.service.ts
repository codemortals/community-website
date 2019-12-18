import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Observable, from, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Event, UserProfile } from '@cm/models';

@Injectable({
    providedIn: 'root',
})
export class EventService {

    constructor(
        private firestore: AngularFirestore,
    ) {
    }

    public create(event: Event): Observable<Event> {
        const events = this.firestore.collection<Event>('events');

        event.uid = this.firestore.createId();
        event.venue.position = new firebase.firestore.GeoPoint(event.venue.position.latitude, event.venue.position.longitude);

        return from(events.doc(event.uid).set(event))
            .pipe(
                map(() => event),
            );
    }

    public findOne(eventId: string): Observable<Event> {
        const events = this.firestore.collection<Event>('events');
        return events.doc<Event>(eventId)
            .valueChanges()
            .pipe(
                mergeMap((event) =>
                    forkJoin(
                        ...event.organisers.map((organiser: string) => this.firestore.collection<UserProfile>('users').doc<UserProfile>(organiser).get()
                            .pipe(map((user: firebase.firestore.DocumentData) => user.data())),
                        ),
                    )
                        .pipe(
                            map((organisers) => (organisers || []).map(({ uid, alias, avatar }) => ({ uid, alias, avatar }))),
                            map((organisers) => ({ ...event, organisers })),
                        ),
                ),
            );
    }

    public findAll(startDate?: Date, endDate?: Date): Observable<Array<Event>> {
        const events = this.firestore.collection<Event>(
            'events',
            (ref: firebase.firestore.Query) => {
                if (startDate) {
                    ref = ref.where('dateEnd', '>', startDate);
                }
                if (endDate) {
                    ref = ref.where('dateEnd', '<=', endDate);
                }
                return ref.orderBy('dateEnd');
            },
        );
        return events.valueChanges();
    }

}
