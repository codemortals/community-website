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
            date: new Date(2019, 7, 10, 17, 0, 0),
        },
        {
            type: 'conference',
            title: 'Serverless Days',
            link: 'https://london.serverlessdays.io',
            date: new Date(2019, 7, 11, 10, 0, 0),
        },
        {
            type: 'stream',
            title: '4 Developers joining us to discuss entering their careers',
            link: 'https://www.youtube.com/channel/UCtjddf97i066cJVcloZ4B7g',
            date: new Date(2019, 7, 15, 18, 30, 0),
        },
        {
            type: 'meetup',
            title: 'Linux from Scratch - Linux 103 - the CLI and beyond',
            link: 'https://www.meetup.com/Linuxing-In-London/events/262372452/',
            date: new Date(2019, 7, 17, 18, 0, 0),
        },
        {
            type: 'stream',
            title: 'Developers vs Recruiters - Part 2',
            link: 'https://www.youtube.com/channel/UCtjddf97i066cJVcloZ4B7g',
            date: new Date(2019, 7, 24, 18, 30, 0),
        }
    ];

}
