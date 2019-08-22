import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.checkAuthentication()
            .pipe(
                map((res) => {
                    if (!res) {
                        this.router.navigate([ '/' ], { replaceUrl: true });
                        return false;
                    }
                    return true;
                }),
            );
    }

}
