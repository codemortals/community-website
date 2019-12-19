import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    RockAutocompleteModule,
    RockButtonModule,
    RockDatePickerModule,
    RockErrorModule,
    RockInputModule,
    RockMarkdownModule,
    RockSelectModule,
    RockTimePickerModule,
} from '@venzra/bedrock';

import { AuthenticatedDirective } from './authenticated/authenticated.directive';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutSiteComponent } from './layout-site/layout-site.component';
import { PageHeaderComponent } from './page-header/page-header.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    fab,
    faGithub,
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import {
    far,
    faClock,
} from '@fortawesome/free-regular-svg-icons';

import {
    fas,
    faChalkboardTeacher,
    faCheck,
    faHeartbeat,
    faLaptop,
    faLink,
    faMapMarkerAlt,
    faTrashAlt,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        AuthenticatedDirective,
        LayoutAdminComponent,
        LayoutSiteComponent,
        PageHeaderComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RockAutocompleteModule,
        RockButtonModule,
        RockDatePickerModule,
        RockErrorModule,
        RockInputModule,
        RockMarkdownModule,
        RockSelectModule,
        RockTimePickerModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FontAwesomeModule,
        AuthenticatedDirective,
        LayoutAdminComponent,
        LayoutSiteComponent,
        PageHeaderComponent,
        ReactiveFormsModule,
        RockAutocompleteModule,
        RockButtonModule,
        RockDatePickerModule,
        RockErrorModule,
        RockInputModule,
        RockMarkdownModule,
        RockSelectModule,
        RockTimePickerModule,
    ],
})
export class DesignModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fab, far, fas);
        library.addIcons(
            faChalkboardTeacher,
            faCheck,
            faClock,
            faHeartbeat,
            faLaptop,
            faLink,
            faMapMarkerAlt,
            faTrashAlt,
            faUsers,
            faGithub,
            faFacebook,
            faInstagram,
            faTwitter,
            faYoutube,
        );
    }
}
