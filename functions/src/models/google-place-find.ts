interface GooglePlace {
    place_id: string;
    name: string;
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    url: string;
}

export interface GooglePlaceFind {
    html_attributions: Array<string>;
    result: GooglePlace;
    status: string;
}
