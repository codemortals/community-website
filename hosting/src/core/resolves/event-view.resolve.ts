import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Event } from '@cm/models';
import { EventService } from '@cm/services';

@Injectable({
    providedIn: 'root',
})
export class EventViewResolve implements Resolve<Event> {

    constructor(
        private eventService: EventService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> {
        return this.eventService.findOne(route.params.eventId).pipe(take(1));
    }

}
