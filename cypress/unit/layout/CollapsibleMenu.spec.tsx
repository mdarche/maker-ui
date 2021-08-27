import * as React from 'react'
import { CollapsibleMenu } from 'maker-ui'
import { mount } from '@cypress/react'

import { nestedMenu, Wrapper } from '../setup'

/**
 * This file also includes integration tests for the `ExpandButton` and `MenuItem` component.
 */

describe('Collapsible Menu component', () => {
  it('renders with default props', () => {
    mount(
      <Wrapper>
        <CollapsibleMenu menu={nestedMenu} />
      </Wrapper>
    )
    cy.get('.collapse-menu')
  })

  it('opens nested submenu by clicking the ExpandButton', () => {
    mount(
      <Wrapper>
        <CollapsibleMenu menu={nestedMenu} />
      </Wrapper>
    )
    cy.get('.submenu-toggle').click()
    cy.get('.submenu-toggle').should('have.attr', 'aria-expanded', 'true')
    cy.get('.submenu-toggle svg').should('have.css', 'transform')
    cy.get('.submenu li').eq(0).contains('Five')
    cy.get('.submenu-toggle').click()
    cy.get('.submenu-toggle').should('have.attr', 'aria-expanded', 'false')
  })
})

describe('MenuItem component (internal)', () => {
  it('supports all MenuItem props', () => {
    const menu = [
      {
        label: 'Google',
        path: 'https://google.com',
        classes: 'test-menu-class',
        icon: <div>Custom Icon</div>,
        newTab: true,
      },
      {
        label: 'Level 1',
        path: '#',
        submenu: [
          {
            label: 'Level 2',
            path: '#',
            submenu: [{ label: 'Level 3', path: '#' }],
          },
        ],
      },
    ]
    mount(
      <Wrapper>
        <CollapsibleMenu menu={menu} />
      </Wrapper>
    )
    cy.get('.test-menu-class').contains('Custom Icon')
    cy.get('.test-menu-class a').should('have.attr', 'target', '_blank')
    cy.get('.collapse-menu li').eq(1).get('.submenu-toggle').click()
    cy.get('.depth-0 .submenu-toggle').click()
    cy.contains('Level 3')
  })

  it('opens nested submenus with `openNested` prop', () => {
    const menu = [
      {
        label: 'Level 1',
        path: '#',
        openNested: true,
        submenu: [{ label: 'Level 2', path: '#' }],
      },
    ]
    mount(
      <Wrapper>
        <CollapsibleMenu menu={menu} />
      </Wrapper>
    )
    cy.contains('Level 2')
  })
})
