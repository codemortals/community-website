import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faGithub,
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import {
    faChalkboardTeacher,
    faCheck,
    faExternalLinkAlt,
    faLaptop,
    faHeartbeat,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        FontAwesomeModule,
    ],
    exports: [
        FontAwesomeModule,
    ]
})
export class DesignModule {
    constructor() {
        library.add(
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
