import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RockButtonModule, RockErrorModule, RockInputModule, RockSelectModule } from '@venzra/bedrock';

import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutSiteComponent } from './layout-site/layout-site.component';

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
    fas,
    faChalkboardTeacher,
    faCheck,
    faExternalLinkAlt,
    faLaptop,
    faHeartbeat,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        LayoutAdminComponent,
        LayoutSiteComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RockButtonModule,
        RockErrorModule,
        RockInputModule,
        RockSelectModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FontAwesomeModule,
        LayoutAdminComponent,
        LayoutSiteComponent,
        ReactiveFormsModule,
        RockButtonModule,
        RockErrorModule,
        RockInputModule,
        RockSelectModule,
    ]
})
export class DesignModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab);
        library.addIcons(
            faChalkboardTeacher,
            faCheck,
            faExternalLinkAlt,
            faLaptop,
            faHeartbeat,
            faUsers,
            faGithub,
            faFacebook,
            faInstagram,
            faTwitter,
            faYoutube,
        );
    }
}
