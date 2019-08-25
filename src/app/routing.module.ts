import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@cm/services/auth.guard';

const routes: Routes = [
    {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule',
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [ AuthGuard ],
    },
    {
        path: '',
        loadChildren: './content/content.module#ContentModule',
    },
    {
        path: '**',
        redirectTo: 'error/not-found',
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
