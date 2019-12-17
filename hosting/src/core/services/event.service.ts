import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

import { Observable, from, forkJoin } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { Event, UserProfile } from '@cm/models';

@Injectable({
    providedIn: 'root',
})
export class EventService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

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
                            .pipe(map((user: firebase.firestore.DocumentData) => user.data()))
                        ),
                    )
                        .pipe(
                            map((organisers) => (organisers || []).map(({ uid, alias, avatar }) => ({ uid, alias, avatar }))),
                            map((organisers) => ({ ...event, organisers })),
                        ),
                ),
            );
    }

    public findAll(): Observable<Array<Event>> {
        const events = this.firestore.collection<Event>('events', (ref) => ref.orderBy('dateStart'));
        return events.valueChanges();
    }

}

@Injectable({
    providedIn: 'root',
})
export class EventServiceResolve implements Resolve<Array<Event>> {

    constructor(
        private eventService: EventService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Event>> {
        return this.eventService.findAll().pipe(take(1));
    }

}
