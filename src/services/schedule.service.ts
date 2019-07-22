import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event } from '../app/schedule/event';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    public findAll(): Observable<Array<Event>> {
        return this.firestore.collection<Event>('schedule').valueChanges();
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
