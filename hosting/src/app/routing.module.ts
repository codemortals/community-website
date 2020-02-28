import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@cm/guards';
import { AuthResolve } from '@cm/services';

const routes: Routes = [
    {
        path: 'error',
        loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [ AuthGuard ],
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
        resolve: {
            auth: AuthResolve,
        },
    },
    {
        path: '',
        loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
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
