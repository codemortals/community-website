import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthResolve } from '@cm/services';

import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
        ],
        resolve: {
            auth: AuthResolve,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutingModule {
}
