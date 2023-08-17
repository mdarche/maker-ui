/// <reference types="cypress" />

import { mount } from 'cypress/react18'
export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: typeof mount
    }
  }
}
