import { Tooltip } from '../src'

/**
 * @component
 * Tooltip
 *
 * @tests
 * - Render with defaults
 * - Prop: `label` (component)
 * - Prop: `buttonCss`
 * - Prop: `background`, `color`
 * - Prop: `noArrow`
 * - Prop: `position`, `gap` (visual)
 *
 * @notes
 * See Popover.cy.tsx for gap, defer, trapFocus, and closeOnBlur unit tests
 */

const TestTooltip = ({ children, label, ...props }) => {
  return (
    <div
      className="flex align-center justify-center"
      style={{ height: '100vh', width: '100vw' }}>
      <Tooltip label={label} {...props}>
        {children}
      </Tooltip>
    </div>
  )
}

describe('Tooltip', () => {
  /* Render with default props */

  it('renders with default props', () => {
    cy.mount(<TestTooltip label="Label">Tooltip content</TestTooltip>)
    cy.get('button').focus()
    cy.contains('Tooltip content')
  })

  /* Prop: `label` (component) */

  it('renders with a custom label component', () => {
    cy.mount(<TestTooltip label={<h2>Label</h2>}>Tooltip content</TestTooltip>)
    cy.get('h2').contains('Label')
    cy.get('button').focus()
    cy.contains('Tooltip content')
  })

  /* Prop: `buttonCss` */

  it('applies `buttonCss` to the button label and `css` to the tooltip content container', () => {
    cy.mount(
      <TestTooltip
        buttonCss={{ padding: 10 }}
        css={{ padding: 20 }}
        label="label">
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').should('have.css', 'padding', '10px')
    cy.get('button').focus()
    cy.get('.tooltip').should('have.css', 'padding', '20px')
  })

  /* Prop: `background`, `color` */

  it('applies a custom color and background with the `background` and `color` props', () => {
    cy.mount(
      <TestTooltip label="label" background="#e3e333" color="#e23353">
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
    cy.get('.tooltip').should('have.backgroundColor', '#e3e333')
    cy.get('.tooltip').should('have.color', '#e23353')
  })

  /* Prop: `noArrow` */

  it('removes the pseudo arrow styles with the `noArrow` prop (visual)', () => {
    cy.mount(<TestTooltip label="label">Tooltip content</TestTooltip>)
    cy.get('button').focus()
  })

  /* Prop: `position`, `gap` (visual) */

  // VISUAL TEST - position top
  it('positions the tooltip to the top of the label', () => {
    cy.mount(
      <TestTooltip
        label="label"
        position="top"
        gap={30}
        css={{ padding: 20, height: 300 }}>
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
  })

  // VISUAL TEST - position bottom
  it('positions the tooltip to the bottom of the label', () => {
    cy.mount(
      <TestTooltip label="label" css={{ height: 200 }}>
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
  })

  // VISUAL TEST - position left
  it('positions the tooltip to the top of the label (visual)', () => {
    cy.mount(
      <TestTooltip label="label" css={{ height: 200 }}>
        Tooltip content
      </TestTooltip>
    )
    cy.get('button').focus()
  })
})
