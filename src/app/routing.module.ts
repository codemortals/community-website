import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
    {
        path: 'schedule',
        component: ScheduleComponent
    },
    {
        path: '**',
        component: LandingComponent,
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
