import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable } from 'rxjs';

import { GooglePlaceFind, GooglePlaceSearch } from '@cm/models';

import { environment } from '@cm/environments/environment';

@Injectable()
export class GooglePlacesService {

    constructor(
        private fireFunctions: AngularFireFunctions
    ) {
        if (!environment.production) {
            this.fireFunctions.functions.useFunctionsEmulator('http://localhost:5000');
        }
    }

    public searchPlace(placeName: string, type: string, sessionId: string): Observable<GooglePlaceSearch> {
        const googlePlacesSearch = this.fireFunctions.httpsCallable<any, GooglePlaceSearch>('GooglePlacesSearch');
        return googlePlacesSearch({ placeName, type, sessionId });
    }

    public getPlace(placeId: string, sessionId: string): Observable<GooglePlaceFind> {
        const googlePlacesFind = this.fireFunctions.httpsCallable<any, GooglePlaceFind>('GooglePlacesFind');
        return googlePlacesFind({ placeId, sessionId });
    }

}
