import * as React from 'react'
import { Flex } from 'maker-ui'
import { Popover } from '@maker-ui/components'
import { mount } from '@cypress/react'

/**
 * @todo - Add test for defer measurements fix. Or remove all together
 * @todo - Add visual snapshot testing for visual tests
 */

interface TestProps {
  children: React.ReactNode
  btnStyle?: object
  [key: string]: any
}

const BasicPopover = ({ children, btnStyle, ...props }: TestProps) => {
  const [show, set] = React.useState(false)
  const buttonRef = React.useRef(null)

  return (
    <Flex
      align="center"
      justify="center"
      css={{ height: '100vh', width: '100vw' }}>
      <button
        className="test-btn"
        ref={buttonRef}
        style={btnStyle}
        onClick={() => set(!show)}>
        Popover toggle
      </button>
      <Popover show={show} set={set} anchorRef={buttonRef} {...props}>
        {children}
      </Popover>
    </Flex>
  )
}

describe('Popover component', () => {
  it('renders with default props', () => {
    mount(<BasicPopover>Popover-content</BasicPopover>)
    cy.get('.popover').should('not.exist')
    cy.get('button').click()
    cy.get('.popover').contains('Popover-content')
    // Confirm it attaches popover to body element
    cy.get('#__cy_root').should('not.contain', 'Popover-content')
  })

  it('applies `_css` to the popover root and `css` to the popover content', () => {
    // Also test merged className
    mount(
      <BasicPopover
        className="my-popover"
        css={{ padding: 10 }}
        _css={{ background: '#000' }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
    cy.get('.my-popover').should('have.backgroundColor', '#000')
    cy.get('.popover .container').should('have.css', 'padding', '10px')
  })

  it('closes the popover when focus leaves its inner contents with `closeOnBlur` (keyboard)', () => {
    // closeOnBlur = true
    mount(
      <>
        <BasicPopover>
          <button>Popover button</button>
        </BasicPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('.test-btn').click()
    // @ts-ignore
    cy.get('.popover button').tab()
    cy.get('.popover').should('not.exist')

    // closeOnBlur = false
    mount(
      <>
        <BasicPopover closeOnBlur={false}>
          <button>Popover button</button>
        </BasicPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('.test-btn').click()
    // @ts-ignore
    cy.get('.popover button').tab()
    cy.get('.popover')
  })

  it('traps focus inside the popover with `trapFocus` (keyboard)', () => {
    // trapFocus = true
    mount(
      <>
        <BasicPopover trapFocus>
          <button id="btn-1">Popover button</button>
          <button id="btn-2">Popover button</button>
          <button id="btn-3">Popover button</button>
        </BasicPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('.test-btn').click()
    // @ts-ignore
    cy.get('#btn-1').tab()
    // @ts-ignore
    cy.get('#btn-2').tab()
    // @ts-ignore
    cy.get('#btn-3').tab()
    cy.get('#btn-1').should('have.focus')

    // trapFocus = false
    mount(
      <>
        <BasicPopover>
          <button id="btn-1">Popover button</button>
          <button id="btn-2">Popover button</button>
          <button id="btn-3">Popover button</button>
        </BasicPopover>
        <button id="new-focus">Blur</button>
      </>
    )
    cy.get('.test-btn').click()
    // @ts-ignore
    cy.get('#btn-1').tab()
    // @ts-ignore
    cy.get('#btn-2').tab()
    // @ts-ignore
    cy.get('#btn-3').tab()
    cy.get('#new-focus').should('have.focus')
    cy.get('.popover').should('not.exist')
  })

  it('adds the popover to a specified DOM node with the `appendTo` prop', () => {
    mount(<BasicPopover appendTo="__cy_root">Popover-content</BasicPopover>)
    cy.get('button').click()
    cy.get('#__cy_root').contains('Popover-content')
  })

  it('matches the width of the anchor element with the `anchorWidth` prop', () => {
    mount(
      <BasicPopover btnStyle={{ width: 500 }}>Popover-content</BasicPopover>
    )
    cy.get('button').click()
    cy.get('.popover').should('not.have.css', 'width', '500px')

    mount(
      <BasicPopover anchorWidth btnStyle={{ width: 500 }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
    cy.get('.popover').should('have.css', 'width', '500px')
  })

  it('supports the scale transition', () => {
    mount(
      <BasicPopover transition="scale" css={{ background: 'red', height: 300 }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
    cy.get('.popover').should('have.css', 'height', '300px')
  })

  it('supports no transition', () => {
    mount(<BasicPopover transition="none">Popover-content</BasicPopover>)
    cy.get('button').click()
    cy.get('.popover').should('have.css', 'visibility', 'visible')
  })

  // VISUAL TEST - transition
  it('supports fade transitions', () => {
    mount(<BasicPopover transition="fade-up">Popover-content</BasicPopover>)
    cy.get('button').click()

    mount(<BasicPopover transition="fade-down">Popover-content</BasicPopover>)
    cy.get('button').click()

    mount(<BasicPopover transition="fade-left">Popover-content</BasicPopover>)
    cy.get('button').click()

    mount(<BasicPopover transition="fade-right">Popover-content</BasicPopover>)
    cy.get('button').click()
  })

  // VISUAL TEST - gap
  it('adds margin to the popover relative to its anchor with the `gap` prop', () => {
    mount(
      <BasicPopover
        btnStyle={{ width: 300 }}
        gap={20}
        position={{ x: 'right', y: 'center' }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- left, center (visual)', () => {
    mount(
      <BasicPopover position={{ x: 'left', y: 'center' }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- right, top (visual)', () => {
    mount(
      <BasicPopover position={{ x: 'right', y: 'top' }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- center, center (visual)', () => {
    mount(
      <BasicPopover
        css={{ background: '#d3d3d3', height: 300 }}
        position={{ x: 'center', y: 'top' }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
  })

  // VISUAL TEST - position
  it('uses the `position` prop -- origin, bottom (visual)', () => {
    mount(
      <BasicPopover position={{ x: 'origin', y: 'bottom' }}>
        Popover-content
      </BasicPopover>
    )
    cy.get('button').click()
  })
})
