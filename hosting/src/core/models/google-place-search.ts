interface GooglePlace {
    id: string;
    description: string;
}

export interface GooglePlaceSearch {
    uid: string;
    places: Array<GooglePlace>;
}
