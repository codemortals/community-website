import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { UserProfile } from '@cm/models';
import { AuthenticationService } from '@cm/services';

@Component({
    selector: 'cm-layout-site',
    templateUrl: './layout-site.component.html',
    styleUrls: [ './layout-site.component.scss' ],
})
export class LayoutSiteComponent implements OnDestroy, OnInit {

    public account: UserProfile;

    private isDestroyed = new Subject();

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public ngOnInit(): void {
        this.authenticationService.account.pipe(takeUntil(this.isDestroyed)).subscribe((account) => this.account = account);
    }

    public login(): void {
        this.authenticationService.login('github').pipe(take(1)).subscribe();
    }

    public logout(): void {
        this.authenticationService.logout().pipe(take(1)).subscribe();
    }

}
