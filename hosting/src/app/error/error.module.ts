import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignModule } from '../../design/design.module';

import { ErrorComponent } from './error.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        ErrorComponent,
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
        DesignModule,
        RoutingModule,
    ],
})
export class ErrorModule {
}
