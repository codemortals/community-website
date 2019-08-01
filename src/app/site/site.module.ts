import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteComponent } from './site.component';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { DesignModule } from '../design.module';
import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        SiteComponent,
        ErrorComponent,
        LandingComponent,
        ScheduleComponent,
    ],
    imports: [
        CommonModule,
        DesignModule,
        RoutingModule,
    ],
})
export class SiteModule {
}
