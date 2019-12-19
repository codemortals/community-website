import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Event } from '@cm/models';
import { EventService } from '@cm/services';

@Injectable({
    providedIn: 'root'
})
export class EventListResolve implements Resolve<Array<Event>> {

    constructor(
        private eventService: EventService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Event>> {
        return this.eventService.findAll(route.data.startDate).pipe(take(1));
    }

}
