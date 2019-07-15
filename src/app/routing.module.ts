import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingComponent
    },
    {
        path: 'schedule',
        component: ScheduleComponent
    },
    {
        path: '**',
        component: ErrorComponent,
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
