interface GooglePlace {
    place_id: string,
    description: string;
}

export interface GooglePlaceSearch {
    error_message?: string;
    predictions: Array<GooglePlace>;
    status: string;
}
