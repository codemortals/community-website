import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

import { RoutingModule } from './routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {
    constructor() {
        library.add(
            faFacebook,
            faInstagram,
            faTwitter,
            faYoutube,
        );
    }
}
