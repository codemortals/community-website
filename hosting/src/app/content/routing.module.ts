import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: LandingComponent,
            },
        ],
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
