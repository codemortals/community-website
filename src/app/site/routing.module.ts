import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site.component';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { ScheduleServiceResolve } from '../../services/schedule.service';

const routes: Routes = [
    {
        path: '',
        component: SiteComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: LandingComponent,
            },
            {
                path: 'schedule',
                pathMatch: 'full',
                component: ScheduleComponent,
                resolve: {
                    scheduleData: ScheduleServiceResolve
                }
            },
            {
                path: '**',
                component: ErrorComponent,
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
