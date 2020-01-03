import * as fs from 'fs';
import * as path from 'path';
import * as functions from 'firebase-functions';

import { MailData } from '@sendgrid/helpers/classes/mail';
import { send, setApiKey } from '@sendgrid/mail';
import { render } from 'ejs';

import { CallableContext } from 'firebase-functions/lib/providers/https';

const getTemplate = (template: string): string => {
    return fs.readFileSync(path.join(__dirname, 'templates', template)).toString();
};

export const SendGridContactEmail = functions.https.onCall(async (data: any, context: CallableContext): Promise<any> => {
    setApiKey(functions.config().sendgrid.api_key);

    const name = data.name;
    const email = data.email;
    const phone = data.phone || 'not provided';
    const message = data.message.split('\n').map((line: string) => line.trim()).filter(Boolean);

    const to = 'team@codemortals.io';
    const cc = `${name} <${email}>`;
    const from = `Code Mortals <${to}>`;
    const subject = `Contact message from ${ name }`;
    const html = await render(getTemplate('contact.html'), { subject, name, email, phone, message });

    const payload: MailData = { to, cc, from, subject, html };

    try {
        await send(payload);
        return { done: true };
    } catch (error) {
        return { done: false, error: error.message };
    }

});
