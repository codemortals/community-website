import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RockAutocompleteList, RockAutocompleteValue, UrlValidator } from '@venzra/bedrock';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserProfile } from '@cm/models';
import { AuthenticationService, GooglePlacesService, ProfileService } from '@cm/services';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.scss' ],
})
export class ProfileComponent implements OnInit {

    public account: UserProfile;
    public accountForm: FormGroup;

    public roles = [
        'API Developer',
        'Automation Engineer',
        'Cloud Platform Engineer',
        'Database Administrator',
        'Desktop Application Developer',
        'Developer Advocate',
        'Developer in Training',
        'Exploratory Tester',
        'Full Stack Web Developer',
        'Infrastructure Engineer',
        'Mobile Application Developer',
        'Project Manager',
        'Security Engineer',
        'Senior Management',
        'User Experience Developer',
        'User Interface Developer',
        'Visual Designer',
    ];

    private googleSession: string;

    constructor(
        private form: FormBuilder,
        private authenticationService: AuthenticationService,
        private googlePlaceService: GooglePlacesService,
        private profileService: ProfileService,
    ) { }

    public ngOnInit(): void {
        this.account = this.authenticationService.account.getValue();

        this.accountForm = this.form.group({
            introduction: [ undefined, [ Validators.required, Validators.maxLength(1000) ] ],
            role: [ undefined, [ Validators.required ] ],
            social: this.form.group({
                github: [ { value: undefined, disabled: true }, [ UrlValidator ] ],
                twitter: [ undefined, [ UrlValidator ] ],
                youtube: [ undefined, [ UrlValidator ] ],
                facebook: [ undefined, [ UrlValidator ] ],
                linkedin: [ undefined, [ UrlValidator ] ],
                instagram: [ undefined, [ UrlValidator ] ],
            }),
            location: [ undefined, [ Validators.required ] ],
        });

        this.accountForm.reset({ ...this.account });
    }

    public searchAddress(searchValue: string): Observable<Array<RockAutocompleteList>> {
        return this.googlePlaceService
            .searchPlace(searchValue, '(cities)', this.googleSession)
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

    public saveProfile(): void {
        const profileData = this.accountForm.getRawValue();

        profileData.location = profileData.place;
        delete profileData.place;

        const profile = { uid: this.account.uid, ...this.accountForm.getRawValue() };
        this.profileService.update(profile).subscribe(() => this.accountForm.markAsPristine());
    }

}
