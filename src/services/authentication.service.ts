import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

import { from, Observable, of, ReplaySubject } from 'rxjs';
import { tap, take, mergeMap, map } from 'rxjs/operators';

import { UserProfile } from './models';
import { ProfileService } from './profile.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    public account: ReplaySubject<UserProfile> = new ReplaySubject(1);

    constructor(
        private fireAuth: AngularFireAuth,
        private profileService: ProfileService,
    ) { }

    public checkAuthentication(): Observable<UserProfile> {
        return this.fireAuth.authState.pipe(take(1), mergeMap((user) => user ? this.loadAccount(user.uid) : of(null)));
    }

    public login(provider: 'github'): Observable<UserProfile> {
        let provision;
        switch (provider) {
            case 'github':
                provision = new firebase.auth.GithubAuthProvider();
                break;
        }

        const login = this.fireAuth.auth.signInWithPopup(provision);
        return from(login).pipe(
            map(({ user, additionalUserInfo }) => {
                const uid = user.uid;
                const alias = user.displayName;
                const email = user.email;
                const avatar = user.photoURL;
                const since = firebase.firestore.Timestamp.fromDate(new Date(user.metadata.creationTime));
                const social = { github: (<any> additionalUserInfo.profile).html_url };

                return { uid, alias, email, avatar, social, since };
            }),
            mergeMap((profile: UserProfile) => this.profileService.update(profile)),
            mergeMap((profile: UserProfile) => this.loadAccount(profile.uid)),
        );
    }

    public logout(): Observable<void> {
        const logout = this.fireAuth.auth.signOut();
        return from(logout).pipe(map(() => this.account.next(null)));
    }

    private loadAccount(userId: string): Observable<UserProfile> {
        return this.profileService.retrieve(userId).pipe(
            take(1),
            tap((profile: UserProfile) => this.account.next(profile)),
        );
    }

}

@Injectable({
    providedIn: 'root',
})
export class AuthResolve implements Resolve<UserProfile> {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile> {
        return this.authenticationService.checkAuthentication();
    }

}
