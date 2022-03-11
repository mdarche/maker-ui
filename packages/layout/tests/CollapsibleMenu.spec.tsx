import * as React from 'react'
import { mount } from '@cypress/react'

import { CollapsibleMenu, type MakerMenu } from '../src'
import { nestedMenu, Wrapper } from './_setup'

/**
 * @component
 * MenuItem (internal)
 * CollapsibleMenu
 *
 * @tests
 * - Prop: `label`, `path`, `classes`, `icon`, `newTab`, `submenu` (MenuItem)
 * - Prop: `openNested` (MenuItem)
 * - Render with defaults (CollapsibleMenu)
 * - Behavior: opens nested submenus by clicking the ExpandButton (CollapsibleMenu)
 *
 * @notes
 * This file also includes integration tests for the `ExpandButton` and `MenuItem` component
 */

describe('MenuItem', () => {
  /* Prop: `label`, `path`, `className`, `icon`, `newTab`, `submenu` */

  it('supports all MenuItem props', () => {
    const menu: MakerMenu = [
      {
        label: 'Google',
        path: 'https://google.com',
        className: 'test-menu-class',
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

  /* Prop: `openNested` */

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

describe('CollapsibleMenu', () => {
  /* Render with defaults */

  it('renders with default props', () => {
    mount(
      <Wrapper>
        <CollapsibleMenu menu={nestedMenu} />
      </Wrapper>
    )
    cy.get('.collapse-menu')
  })

  /* Behavior: opens nested submenus by clicking the ExpandButton */

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
