import { Component, OnInit } from '@angular/core';

import { UserProfile } from '@cm/services/models';
import { AuthenticationService } from '@cm/services';

@Component({
    selector: 'cm-layout-site',
    templateUrl: './layout-site.component.html',
    styleUrls: [ './layout-site.component.scss' ],
})
export class LayoutSiteComponent implements OnInit {

    public account: UserProfile;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    public ngOnInit(): void {
        this.authenticationService.account.subscribe((account) => this.account = account);
    }

    public async login(): Promise<void> {
        await this.authenticationService.login('github');
    }

    public async logout(): Promise<void> {
        await this.authenticationService.logout();
    }

}
