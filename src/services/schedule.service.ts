import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Event } from '../app/schedule/event';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    public findAll(): Observable<Array<Event>> {
        return this.firestore.collection<Event>(
            'schedule',
            (ref: firebase.firestore.Query) => ref.where('dateEnd', '>', new Date()).orderBy('dateEnd'),
        ).valueChanges();
    }

}

@Injectable({
    providedIn: 'root',
})
export class ScheduleServiceResolve implements Resolve<Array<Event>> {

    constructor(
        private scheduleService: ScheduleService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Event>> {
        return this.scheduleService.findAll().pipe(take(1));
    }

}
