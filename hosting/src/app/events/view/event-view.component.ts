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
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            gestureHandling: 'none'
        };
        this.map = new this.google.maps.Map(this.googleMap.nativeElement, mapOptions);

        const map = this.map;
        const position = latLng;
        const title = this.event.venue.name;

        return new this.google.maps.Marker({ map, position, title });
    }

}
