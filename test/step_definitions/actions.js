import { When } from 'cypress-cucumber-preprocessor/steps';

When(/^the "([^"]*)" link in the "([^"]*)" is clicked$/, (link, role) => {
    cy.get(`[role="${role}"]`)
        .within(() => {
            cy.get('a')
                .contains(link)
                .click();
        });
});
