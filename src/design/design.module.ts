import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [
        LayoutAdminComponent,
        LayoutSiteComponent,
        FontAwesomeModule,
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
