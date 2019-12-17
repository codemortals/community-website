import { NgModule } from '@angular/core';

import { DesignModule } from '../../design/design.module';

import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';

import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        AccountComponent,
        ProfileComponent,
    ],
    imports: [
        DesignModule,
        RoutingModule,
    ],
})
export class AccountModule {
}
