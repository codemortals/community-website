import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RockAutocompleteList, RockAutocompleteValue, UrlValidator } from '@venzra/bedrock';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserProfile } from '@cm/models';
import { AuthenticationService, EventService, GooglePlacesService } from '@cm/services';

@Component({
    templateUrl: './event-create.component.html',
    styleUrls: [ './event-create.component.scss' ],
})
export class EventCreateComponent implements OnInit {

    public account: UserProfile;
    public eventForm: FormGroup;
    public initialTime = new Date(0, 0, 0, 15, 0, 0, 0);

    public types = [
        { name: 'Meet-Up', value: 'meetup' },
        { name: 'Workshop', value: 'workshop' },
        { name: 'Conference', value: 'conference' },
        { name: 'Hackathon', value: 'hackathon' },
        { name: 'Online Stream', value: 'stream' },
    ];

    private googleSession: string;

    constructor(
        private form: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private googlePlaceService: GooglePlacesService,
        private eventService: EventService,
    ) { }

    public ngOnInit(): void {
        this.account = this.authenticationService.account.getValue();

        this.eventForm = this.form.group({
            type: [ undefined, [ Validators.required ] ],
            title: [ undefined, [ Validators.required, Validators.maxLength(200) ] ],
            image: [ undefined, [ UrlValidator ] ],
            website: [ undefined, [] ],
            summary: [ undefined, [ Validators.required, Validators.maxLength(5000) ] ],
            venue: [ undefined, [ Validators.required ] ],
            dates: this.form.array([ this.createDate() ]),
        });
    }

    public addDate(): void {
        const dates = <FormArray> this.eventForm.get('dates');
        dates.push(this.createDate());
    }

    public removeDate(index: number): void {
        const dates = <FormArray> this.eventForm.get('dates');

        if (dates.length > 1) {
            dates.removeAt(index);
        }
    }

    private createDate(): FormGroup {
        return this.form.group({
            date: [ undefined, [ Validators.required ] ],
            timeStart: [ undefined, [ Validators.required ] ],
            timeEnd: [ undefined, [ Validators.required ] ],
        });
    }

    public getToday(): Date {
        return new Date();
    }

    public searchAddress(searchValue: string): Observable<Array<RockAutocompleteList>> {
        return this.googlePlaceService
            .searchPlace(searchValue, 'establishment', this.googleSession)
            .pipe(
                map((result) => {
                    this.googleSession = result.uid;
                    return result.places.map((place) => ({ id: place.id, text: place.description }));
                }),
            );
    }

    public selectAddress(placeId: string): Observable<RockAutocompleteValue> {
        return this.googlePlaceService
            .getPlace(placeId, this.googleSession)
            .pipe(
                map((result) => {
                    this.googleSession = null;
                    return { display: result.place.name, value: result.place };
                }),
            );
    }

    public createEvent(): void {
        const organisers = [ this.account.uid ];
        const event = this.eventForm.getRawValue();

        event.dates = event.dates
            .map((entry) => {
                const date: Date = entry.date;
                const timeStart: Date = entry.timeStart;
                const timeEnd: Date = entry.timeEnd;

                return {
                    start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeStart.getHours(), timeStart.getMinutes(), 0, 0),
                    end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeEnd.getHours(), timeEnd.getMinutes(), 0, 0),
                };
            })
            .sort((a, b) => a.start > b.start ? 1 : -1);

        event.dateStart = event.dates[ 0 ].start;
        event.dateEnd = event.dates[ event.dates.length - 1 ].end;

        this.eventService
            .create({ organisers, ...event })
            .subscribe(
                () => this.router.navigate([ '/events' ]),
            );
    }

}
