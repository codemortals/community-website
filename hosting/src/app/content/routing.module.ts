import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { ServicesComponent } from './services/services.component';

import { EventsComponent } from './services/events/events.component';
import { RecruitmentComponent } from './services/recruitment/recruitment.component';
import { TrainingComponent } from './services/training/training.component';
import { SoftwareComponent } from './services/software/software.component';

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
                path: 'contact-us',
                component: ContactComponent,
            },
            {
                path: 'services',
                component: ServicesComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'software',
                    },
                    {
                        path: 'events',
                        component: EventsComponent,
                    },
                    {
                        path: 'recruitment',
                        component: RecruitmentComponent,
                    },
                    {
                        path: 'training',
                        component: TrainingComponent,
                    },
                    {
                        path: 'software',
                        component: SoftwareComponent,
                    },
                ],
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
