import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignModule } from '@cm/design/design.module';

import { ContentComponent } from './content.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { ServicesComponent } from './services/services.component';

import { EventsComponent } from './services/events/events.component';
import { RecruitmentComponent } from './services/recruitment/recruitment.component';
import { TrainingComponent } from './services/training/training.component';
import { SoftwareComponent } from './services/software/software.component';

import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        ContentComponent,
        ContactComponent,
        LandingComponent,
        ServicesComponent,
        EventsComponent,
        RecruitmentComponent,
        TrainingComponent,
        SoftwareComponent,
    ],
    imports: [
        CommonModule,
        DesignModule,
        RoutingModule,
    ],
})
export class ContentModule {
}
