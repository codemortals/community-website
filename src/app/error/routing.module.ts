import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthResolve } from '@cm/services';

import { ErrorComponent } from './error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: ErrorComponent,
        children: [
            {
                path: 'not-found',
                component: NotFoundComponent,
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
