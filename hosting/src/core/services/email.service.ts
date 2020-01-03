import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable } from 'rxjs';

import { EmailContact, EmailResult } from '@cm/models';

import { environment } from '@cm/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(
        private fireFunctions: AngularFireFunctions
    ) {
        if (!environment.production) {
            this.fireFunctions.functions.useFunctionsEmulator('http://localhost:5000');
        }
    }

    public sendContact(contact: EmailContact): Observable<EmailResult> {
        const sendGridContactEmail = this.fireFunctions.httpsCallable<EmailContact, EmailResult>('SendGridContactEmail');
        return sendGridContactEmail(contact);
    }

}
