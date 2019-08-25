import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

import { Observable, ReplaySubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { UserProfile } from './models';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    public account: ReplaySubject<UserProfile> = new ReplaySubject(1);

    constructor(
        private fireAuth: AngularFireAuth,
    ) { }

    public checkAuthentication(): Observable<firebase.User> {
        return this.fireAuth.authState.pipe(take(1), tap((user) => this.loadAccount(user)));
    }

    public async login(provider: 'github'): Promise<boolean> {
        let provision;
        switch (provider) {
            case 'github':
                provision = new firebase.auth.GithubAuthProvider();
                break;
        }

        try {
            await this.fireAuth.auth.signInWithRedirect(provision);
        } catch (error) { }

        return false;
    }

    public async logout(): Promise<void> {
        await this.fireAuth.auth.signOut();
        this.loadAccount();
    }

    private loadAccount(user?: firebase.User | null): void {
        if (!user) {
            this.account.next(null);
            return;
        }

        const alias = user.displayName;
        const email = user.email;
        const avatar = user.photoURL;
        const since = new Date(user.metadata.creationTime);
        this.account.next({ alias, email, avatar, since });
    }

}

@Injectable({
    providedIn: 'root',
})
export class AuthResolve implements Resolve<firebase.User> {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<firebase.User> {
        return this.authenticationService.checkAuthentication();
    }

}
