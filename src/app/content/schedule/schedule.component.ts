import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Event } from '@cm/services/models';
import { ScheduleService } from '@cm/services';

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: [ './schedule.component.scss' ],
})
export class ScheduleComponent implements OnInit, OnDestroy {

    public events: Array<Event>;

    private scheduleSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private scheduleService: ScheduleService,
    ) { }

    public ngOnInit(): void {
        this.events = this.route.snapshot.data.scheduleData;

        this.scheduleSubscription = this.scheduleService.findAll().subscribe((events) => this.events = events);
    }

    public ngOnDestroy(): void {
        this.scheduleSubscription.unsubscribe();
    }

}
