import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthResolve, ScheduleServiceResolve } from '@cm/services';

import { ContentComponent } from './content.component';
import { LandingComponent } from './landing/landing.component';
import { ScheduleComponent } from './schedule/schedule.component';

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
            {
                path: 'schedule',
                component: ScheduleComponent,
                resolve: {
                    scheduleData: ScheduleServiceResolve
                }
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
