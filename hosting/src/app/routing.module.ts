import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@cm/guards';
import { AuthResolve } from '@cm/services';

const routes: Routes = [
    {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule',
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [ AuthGuard ],
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: 'events',
        loadChildren: './events/events.module#EventsModule',
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: '',
        loadChildren: './content/content.module#ContentModule',
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: '**',
        redirectTo: 'error/not-found',
        resolve: {
            auth: AuthResolve,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutingModule {
}
