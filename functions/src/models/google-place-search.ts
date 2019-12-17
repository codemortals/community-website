interface GooglePlace {
    place_id: string,
    description: string;
}

export interface GooglePlaceSearch {
    predictions: Array<GooglePlace>;
    status: string;
}
