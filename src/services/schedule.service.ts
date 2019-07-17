import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {

    constructor(
        private http: HttpClient,
    ) { }

    public findAll(): Observable<Array<Event>> {
        return this.http.get<Array<Event>>('/assets/data/schedule.json');
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
        return this.scheduleService.findAll();
    }

}
