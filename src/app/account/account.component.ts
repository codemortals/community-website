import { Component } from '@angular/core';

import { Navigation } from '@cm/services/models';

@Component({
    templateUrl: './account.component.html',
})
export class AccountComponent {

    public navigation: Array<Navigation> = [
        {
            name: 'Account details',
            items: [
                {
                    name: 'Profile',
                    link: [ '/account', 'profile' ],
                },
                {
                    name: 'Badges',
                    link: [ '/account', 'badges' ],
                },
            ],
        },
    ];

}
