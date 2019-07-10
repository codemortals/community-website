export interface Event {
    type: 'stream' | 'meetup' | 'conference' | 'hackathon';
    title: string;
    link: string;
    date: Date;
}
