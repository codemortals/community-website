import { Component, OnInit } from '@angular/core';
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
    }

}
