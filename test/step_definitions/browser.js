import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url = 'http://localhost:8080';

Given('i open the home page', () => {
    cy.visit(url);
});

Then(/^the title on the page says "([^"]*)"$/, (check) => {
    cy.title().should('include', check);
})
