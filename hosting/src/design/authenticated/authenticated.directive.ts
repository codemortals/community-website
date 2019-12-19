import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@cm/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[cmAuthenticated]' })
export class AuthenticatedDirective implements OnInit, OnDestroy {

    private isDestroyed = new Subject();

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.account
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((account) => {
                if (account) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            });
    }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

}
