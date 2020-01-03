import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '@cm/services';

@Component({
    templateUrl: './contact.component.html',
    styleUrls: [ './contact.component.scss' ],
})
export class ContactComponent implements OnInit {

    public contactForm: FormGroup;
    public completed = false;

    constructor(
        private forms: FormBuilder,
        private emailService: EmailService,
    ) { }

    public ngOnInit(): void {
        this.contactForm = this.forms.group({
            name: [ undefined, [ Validators.required ] ],
            email: [ undefined, [ Validators.required, Validators.email ] ],
            phone: [ undefined, [] ],
            message: [ undefined, [ Validators.required, Validators.maxLength(5000) ] ],
        });
    }

    public resetForm() {
        this.contactForm.reset();
        this.completed = false;
    }

    public sendMessage() {
        const formData = this.contactForm.getRawValue();

        this.emailService
            .sendContact(formData)
            .subscribe((result) => this.completed = result.done);
    }

}
