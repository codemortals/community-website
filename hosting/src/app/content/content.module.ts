import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignModule } from '@cm/design/design.module';

import { ContentComponent } from './content.component';
import { LandingComponent } from './landing/landing.component';

import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        ContentComponent,
        LandingComponent,
    ],
    imports: [
        CommonModule,
        DesignModule,
        RoutingModule,
    ],
})
export class ContentModule {
}
