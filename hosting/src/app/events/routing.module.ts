import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@cm/guards';
import { EventListResolve, EventViewResolve } from '@cm/resolves';

import { EventsComponent } from './events.component';
import { EventCreateComponent } from './create/event-create.component';
import { EventListComponent } from './list/event-list.component';
import { EventViewComponent } from './view/event-view.component';

const routes: Routes = [
    {
        path: '',
        component: EventsComponent,
        children: [
            {
                path: 'create',
                component: EventCreateComponent,
                canActivate: [ AuthGuard ],
            },
            {
                path: ':eventId',
                component: EventViewComponent,
                resolve: {
                    event: EventViewResolve
                }
            },
            {
                path: '',
                component: EventListComponent,
                data: {
                    startDate: new Date()
                },
                resolve: {
                    events: EventListResolve
                }
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
