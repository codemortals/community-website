import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlValidator } from '@venzra/bedrock';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserProfile } from '@cm/services/models';
import { AuthenticationService, ProfileService } from '@cm/services';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.scss' ],
})
export class ProfileComponent implements OnDestroy, OnInit {

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

    private isDestroyed = new Subject();

    constructor(
        private form: FormBuilder,
        private authenticationService: AuthenticationService,
        private profileService: ProfileService,
    ) { }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public ngOnInit(): void {
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
        });

        this.authenticationService.account.pipe(takeUntil(this.isDestroyed)).subscribe((account) => {
            this.account = account;
            this.accountForm.reset(this.account);
        });
    }

    public saveProfile(): void {
        const profile = { uid: this.account.uid, ...this.accountForm.getRawValue() };
        this.profileService.update(profile).subscribe(() => this.accountForm.markAsPristine());
    }

}
