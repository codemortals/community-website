import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(/^a level (\d+) header containing "([^"]*)" should be present$/, (level, content) => {
    cy.get('body')
      .within(() => {
          cy.get(`h${level}`)
            .contains(content)
            .and('be.visible');
      });
});

Then(/^there are (\d+) "([^"]*)" entries$/, (count, className) => {
    cy.get(`.${className}`)
        .should('have.length', count);
});
