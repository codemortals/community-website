import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignModule } from '@cm/design/design.module';

import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';

import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        AccountComponent,
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        DesignModule,
        RoutingModule,
    ],
})
export class AccountModule {
}
