import { Component } from '@angular/core';

import { Event } from './event';

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {

    public events: Array<Event> = [
        {
            type: 'stream',
            title: 'Code Mortals Website (Schedule)',
            link: 'https://www.youtube.com/watch?v=WVzwX3_jJPc',
            dateStart: new Date(2019, 6, 10, 19, 0, 0),
            dateEnd: new Date(2019, 6, 10, 21, 0, 0),
        },
        {
            type: 'conference',
            title: 'Serverless Days',
            link: 'https://london.serverlessdays.io',
            dateStart: new Date(2019, 6, 11, 10, 0, 0),
            dateEnd: new Date(2019, 6, 11, 18, 0, 0),
        },
        {
            type: 'stream',
            title: '4 Developers joining us to discuss entering their careers',
            link: 'https://www.youtube.com/channel/UCtjddf97i066cJVcloZ4B7g',
            dateStart: new Date(2019, 6, 15, 18, 30, 0),
            dateEnd: new Date(2019, 6, 15, 20, 30, 0),
        },
        {
            type: 'meetup',
            title: 'Linux from Scratch - Linux 103 - the CLI and beyond',
            link: 'https://www.meetup.com/Linuxing-In-London/events/262372452/',
            dateStart: new Date(2019, 6, 17, 18, 0, 0),
            dateEnd: new Date(2019, 6, 17, 20, 0, 0),
        },
        {
            type: 'stream',
            title: 'Developers vs Recruiters - Part 2',
            link: 'https://www.youtube.com/channel/UCtjddf97i066cJVcloZ4B7g',
            dateStart: new Date(2019, 6, 24, 18, 30, 0),
            dateEnd: new Date(2019, 6, 24, 20, 30, 0),
        },
        {
            type: 'meetup',
            title: 'JSMonthly - We are speaking about Cypress and Angular CI/CD',
            link: 'https://www.meetup.com/js-monthly/events/262774181/',
            dateStart: new Date(2019, 6, 30, 19, 0, 0),
            dateEnd: new Date(2019, 6, 30, 21, 0, 0),
        }
    ];

    public isFuture(event: Event) {
        return event.dateEnd.getTime() > Date.now();
    }

}
