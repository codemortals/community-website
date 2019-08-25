import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation, UserProfile } from '@cm/services/models';
import { AuthenticationService } from '@cm/services';

@Component({
    selector: 'cm-layout-admin',
    templateUrl: './layout-admin.component.html',
    styleUrls: [ './layout-admin.component.scss' ],
})
export class LayoutAdminComponent implements OnInit {

    public account: UserProfile;

    @Input()
    public navigation: Array<Navigation>;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    public ngOnInit(): void {
        this.authenticationService.account.subscribe((account) => this.account = account);
    }

    public async logout(): Promise<void> {
        await this.authenticationService.logout();
        this.router.navigate(['/']);
    }

}
