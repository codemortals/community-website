import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event } from '@cm/models';
import MapTypeStyle = google.maps.MapTypeStyle;

@Component({
    templateUrl: './event-view.component.html',
    styleUrls: [ './event-view.component.scss' ],
})
export class EventViewComponent implements OnInit, AfterViewInit {

    public event: Event;
    public google = (<any> window).google;

    private map: google.maps.Map;

    @ViewChild('googleMap', { static: false })
    public googleMap: ElementRef;

    @ViewChild('eventAddress', { static: false })
    public eventAddress: ElementRef<any>;

    constructor(
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        this.event = this.route.snapshot.data.event;
    }

    public ngAfterViewInit(): void {
        const latLng: google.maps.LatLng = new this.google.maps.LatLng(
            this.event.venue.position.latitude,
            this.event.venue.position.longitude,
        );

        const styleTypes: Array<MapTypeStyle> = [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' },
                ],
            },
        ];

        const mapOptions: google.maps.MapOptions = {
            zoom: 15,
            center: latLng,
            mapTypeId: 'roadmap',
            styles: styleTypes,
            mapTypeControlOptions: { mapTypeIds: [] }
        };
        this.map = new this.google.maps.Map(this.googleMap.nativeElement, mapOptions);

        const map = this.map;
        const position = latLng;
        const title = this.event.venue.name;

        const marker = new this.google.maps.Marker({ map, position, title });
        const info = new this.google.maps.InfoWindow({
            content: this.eventAddress.nativeElement,
        });

        marker.addListener('click', () => {
            info.open(map, marker);
        });
        info.open(map, marker);
        this.eventAddress.nativeElement.remove();
    }

}
