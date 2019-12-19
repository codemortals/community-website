import { NgModule } from '@angular/core';

import { DesignModule } from '@cm/design/design.module';

import { EventsComponent } from './events.component';
import { EventCreateComponent } from './create/event-create.component';
import { EventListComponent } from './list/event-list.component';
import { EventViewComponent } from './view/event-view.component';

import { RoutingModule } from './routing.module';
import { RockMarkdownModule } from '@venzra/bedrock';

@NgModule({
    declarations: [
        EventsComponent,
        EventCreateComponent,
        EventListComponent,
        EventViewComponent,
    ],
    imports: [
        DesignModule,
        RoutingModule,
        RockMarkdownModule,
    ],
})
export class EventsModule {
}
