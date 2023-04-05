import { Section } from '@maker-ui/layout'
import { Wrapper, defaults, format } from './setup'

/**
 * @component
 * Section
 *
 * @tests
 * - Render with defaults
 * - Option: `content.maxWidthSection`
 * - Prop: `className`, `maxWidth`, `background`, `color`
 * - Prop: `css`, `_css`
 * - Behavior: applies `css` to root when container = false
 */

describe('Section', () => {
  /* Render with defaults */

  it('renders a Section with default props', () => {
    cy.mount(
      <Wrapper header isContent>
        <Section className="section">inner</Section>
      </Wrapper>
    )
    cy.get('.section .container').should('exist')
    cy.get('.section .container').should(
      'have.css',
      'max-width',
      format(defaults.content.maxWidthSection)
    )
  })

  /* Option: `content.maxWidthSection` */

  it('renders with user-generated options', () => {
    cy.mount(
      <Wrapper header isContent options={{ content: { maxWidthSection: 300 } }}>
        <Section className="section">inner</Section>
      </Wrapper>
    )
    cy.get('.section .container').should('have.css', 'max-width', '300px')
  })

  /* Prop: `className`, `maxWidth`, `background`, `color` */

  it('renders with prop values', () => {
    cy.mount(
      <Wrapper header isContent>
        <Section
          className="section"
          maxWidth={700}
          background="#000"
          color="#333">
          inner
        </Section>
      </Wrapper>
    )
    cy.get('.section').should('have.backgroundColor', '#000')
    cy.get('.section').should('have.color', '#333')
    cy.get('.section .container').should('have.css', 'max-width', '700px')
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    cy.mount(
      <Wrapper header isContent>
        <Section
          className="section"
          _css={{ margin: 20 }}
          css={{ padding: 10 }}>
          inner
        </Section>
      </Wrapper>
    )
    cy.get('.section').should('have.css', 'margin', '20px')
    cy.get('.section .container').should('have.css', 'padding', '10px')
  })

  /* Behavior: applies `css` to root when container = false */

  it('applies css to root when container is false', () => {
    cy.mount(
      <Wrapper header isContent>
        <Section
          className="section"
          container={false}
          _css={{ margin: 20 }}
          css={{ padding: 10 }}>
          inner
        </Section>
      </Wrapper>
    )
    cy.get('.section .container').should('not.exist')
    cy.get('.section').should('have.css', 'margin', '20px')
    cy.get('.section').should('have.css', 'padding', '10px')
  })
})
