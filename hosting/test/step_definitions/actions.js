import { When } from 'cypress-cucumber-preprocessor/steps';

When(/^the "([^"]*)" link in the "([^"]*)" is clicked$/, (link, className) => {
    cy.get(`[class="${className}"]`)
        .within(() => {
            cy.get('a')
                .contains(link)
                .click();
        });
});

When(/^the "([^"]*)" icon in the "([^"]*)" is clicked$/, (link, className) => {
    cy.get(`[class="${className}"]`)
        .within(() => {
            cy.get(`a[title=${link}]`)
                .click();
        });
});
