import * as React from 'react'
import { ExpandButton } from '@maker-ui/layout/src/components/Menu/ExpandButton'
import { mount } from '@cypress/react'

const TestButton = () => {
  const [show, set] = React.useState(false)
  return <ExpandButton show={show} set={set} />
}

describe('ExpandButton component (internal)', () => {
  it('renders with default props', () => {
    mount(<TestButton />)
    cy.get('.submenu-toggle').should('have.attr', 'aria-expanded', 'false')
  })

  it('toggles expanded state onClick', () => {
    mount(<TestButton />)
    cy.get('.submenu-toggle').click()
    cy.get('.submenu-toggle').should('have.attr', 'aria-expanded', 'true')
    cy.get('.submenu-toggle svg').should('have.css', 'transform')
  })
})
