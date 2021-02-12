/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataTest(tag: string): Chainable<any>
  }
}
