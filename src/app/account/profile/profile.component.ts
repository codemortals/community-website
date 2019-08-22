import { Component, OnInit } from '@angular/core';

import { UserProfile } from '@cm/services/models';
import { AuthenticationService } from '@cm/services';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.scss' ],
})
export class ProfileComponent implements OnInit {

    public account: UserProfile;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    public ngOnInit(): void {
        this.authenticationService.account.subscribe((account) => this.account = account);
    }

}
