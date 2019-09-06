import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { Navigation, UserProfile } from '@cm/services/models';
import { AuthenticationService } from '@cm/services';

@Component({
    selector: 'cm-layout-admin',
    templateUrl: './layout-admin.component.html',
    styleUrls: [ './layout-admin.component.scss' ],
})
export class LayoutAdminComponent implements OnDestroy, OnInit {

    public account: UserProfile;

    @Input()
    public navigation: Array<Navigation>;

    private isDestroyed = new Subject();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public ngOnInit(): void {
        this.authenticationService.account.pipe(takeUntil(this.isDestroyed)).subscribe((account) => this.account = account);
    }

    public logout(): void {
        this.authenticationService.logout().pipe(
            take(1),
            map(() => this.router.navigate(['/'])),
        ).subscribe();
    }

}
