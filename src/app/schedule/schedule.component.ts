import { Component, OnInit } from '@angular/core';

import { Event } from './event';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: [ './schedule.component.scss' ],
})
export class ScheduleComponent implements OnInit {

    public events: Array<Event>;

    constructor(
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        this.events = this.route.snapshot.data.scheduleData;
    }

    public isFuture(event: Event) {
        return new Date(event.dateEnd).getTime() > Date.now();
    }

}
