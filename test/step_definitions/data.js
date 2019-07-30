import { Given } from 'cypress-cucumber-preprocessor/steps';

Given(/^expect a "([^"]*)" request to "([^"]*)" will return "([^"]*)"$/, (verb, endpoint, response) => {
    cy.server();
    cy.fixture(`${response}.json`).as('responseJSON');

    cy.route({
        method: verb,
        url: endpoint,
        response: '@responseJSON',
        status: 200
    }).as('response');
});
