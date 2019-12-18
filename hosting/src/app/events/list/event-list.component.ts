import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event } from '@cm/models';
import { EventService } from '@cm/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './event-list.component.html',
    styleUrls: [ './event-list.component.scss' ],
})
export class EventListComponent implements OnDestroy, OnInit {

    public events: Array<Event>;

    private isDestroyed = new Subject();

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
    ) { }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public ngOnInit(): void {
        this.events = this.route.snapshot.data.events;

        this.eventService.findAll(new Date())
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((events) => this.events = events);
    }

}
