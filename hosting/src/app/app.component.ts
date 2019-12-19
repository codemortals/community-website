import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from '@cm/environments/environment';

@Component({
    selector: 'cm-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

    private ga = (<any> window).ga;

    constructor(
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
    ) { }

    public ngOnInit(): void {
        this.ga('create', environment.tracking, 'auto');
        this.ga('send', 'pageview');

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);

                this.ga('set', 'page', event.urlAfterRedirects);
                this.ga('send', 'pageview');
            }
        });

        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.firebase.apiKey}`;
        script.async = true;
        this.document.getElementsByTagName('head')[0].appendChild(script);
    }

}
