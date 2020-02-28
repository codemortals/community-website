interface GooglePlace {
    id: string;
    description: string;
}

export interface GooglePlaceSearch {
    sessionId: string;
    places: Array<GooglePlace>;
}
