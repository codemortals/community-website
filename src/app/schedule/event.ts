export interface Event {
    type: 'stream' | 'meetup' | 'conference' | 'hackathon';
    title: string;
    link: string;
    dateStart: Date;
    dateEnd: Date;
}
