/// <reference types="cypress" />
// import { mount } from '@cypress/vue';
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
describe('First Scenario', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fe-task.getsandbox.com/employees', { fixture: 'example.json' });
    cy.visit('/');
  });

  it('employees data is apearing', () => {
    cy.get('.c-users-list__body').should('be.visible');
  });

  it('should open support requests', () => {
    cy.get('#performance_chart_button').click();
    cy.wait(300);
    cy.url().should('include', '/team-performance');
  });
});
