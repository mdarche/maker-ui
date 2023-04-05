import * as React from 'react'
import { PageContents } from '../src'

/**
 * @component
 * PageContents
 *
 * @tests
 * - Render with defaults
 * - Prop: `title`
 * - Prop: `headings`
 * - Prop: `activeColor`
 * - Prop: `indent`
 * - Prop: `indentSize`
 * - Prop: `marker`
 * - Prop: `smoothScroll`
 * - Prop: `css`, `psuedoCss`
 * - Behavior: adds the right ID selector to each link
 * - Behavior: rescans DOM on route change via pathname
 *
 * @todo
 * Simulate a `pathname` prop test to Integration test suite
 */

interface TestLayoutProps {
  children: React.ReactNode
}

const TestLayout = ({ children }: TestLayoutProps) => {
  return (
    <div className="flex">
      <main>
        <h2 id="heading-1">Heading 1</h2>
        <div id="test-div" style={{ height: 500 }}>
          content
        </div>
        <h3 id="sub-1">Subheading 1</h3>
        <div style={{ height: 300 }}>content</div>
        <h2 id="heading-2">Heading 2</h2>
        <div style={{ height: 500 }}>content</div>
        <h2 id="heading-3">Heading 3</h2>
        <h4 id="sub-2">Subheading 2</h4>
        <h5 id="sub-3">Subheading 2</h5>
        <h6 id="sub-4">Subheading 2</h6>
        <div style={{ height: 900 }}>content</div>
      </main>
      <div className="sidebar" style={{ width: 300 }}>
        {children}
      </div>
    </div>
  )
}

describe('PageContents component', () => {
  /* Render with defaults */

  it('renders with default props', () => {
    cy.mount(
      <TestLayout>
        <PageContents data-cy="content-menu" />
      </TestLayout>
    )
    cy.get('li').should('have.length', 5)
    cy.get('.level-1').should('have.css', 'padding-left', '10px')
    cy.get('.level-2').should('have.css', 'padding-left', '20px')
    cy.viewport('iphone-x')
      .get('[data-cy="content-menu"]')
      .should('have.css', 'display', 'none')
  })

  /* Prop: `title` */

  it('supports a custom title component', () => {
    cy.mount(
      <TestLayout>
        <PageContents
          data-cy="content-menu"
          title={<h2>Table of Contents</h2>}
        />
      </TestLayout>
    )
    cy.get('[data-cy="content-menu"] h2').contains('Table of Contents')
  })

  /* Prop: `headings` */

  it('searches for specific heading tags', () => {
    cy.mount(
      <TestLayout>
        <PageContents headings={['h2']} />
      </TestLayout>
    )
    cy.get('li').should('have.length', 3)
  })

  it('searches for all heading tags', () => {
    cy.mount(
      <TestLayout>
        <PageContents headings="all" />
      </TestLayout>
    )
    cy.get('li').should('have.length', 7)
  })

  /* Prop: `activeColor` */

  it("highlights the viewport's active section heading", () => {
    cy.mount(
      <TestLayout>
        <PageContents activeColor="rgb(8, 8, 8)" />
      </TestLayout>
    )
    cy.scrollTo('bottom')
    cy.scrollTo('top').wait(200)
    cy.get('#test-div').scrollIntoView()
    cy.get('li').eq(0).find('a').should('have.class', 'active')
    cy.get('.active').should('have.css', 'color', 'rgb(8, 8, 8)')
  })

  /* Prop: `indent` */

  it('can flatten headings and remove indentation', () => {
    cy.mount(
      <TestLayout>
        <PageContents indent={false} />
      </TestLayout>
    )
    cy.get('.level-1 a').should('have.css', 'padding-left', '0px')
  })

  /* Prop: `indentSize` */

  it('supports custom indentation', () => {
    cy.mount(
      <TestLayout>
        <PageContents indentSize={5} />
      </TestLayout>
    )
    cy.get('.level-1').should('have.css', 'padding-left', '5px')
    cy.get('.level-2').should('have.css', 'padding-left', '10px')
  })

  /* Prop: `marker` */

  it('renders a marker `before` the ToC link', () => {
    cy.mount(
      <TestLayout>
        <PageContents marker="before" />
      </TestLayout>
    )
    cy.scrollTo('bottom')
    cy.scrollTo('top').wait(200)
    cy.get('#heading-2').scrollIntoView()
    cy.get('.active').then((el) => {
      const win = el[0].ownerDocument.defaultView
      const before = win.getComputedStyle(el[0], 'before')
      const left = before.getPropertyValue('left')
      expect(left).to.eq('0px')
    })
  })

  it('renders a marker `after` the ToC link', () => {
    cy.mount(
      <TestLayout>
        <PageContents marker="after" />
      </TestLayout>
    )
    cy.scrollTo('bottom')
    cy.scrollTo('top').wait(200)
    cy.get('#heading-2').scrollIntoView()
    cy.get('.active').then((el) => {
      const win = el[0].ownerDocument.defaultView
      const before = win.getComputedStyle(el[0], 'before')
      const right = before.getPropertyValue('right')
      expect(right).to.eq('0px')
    })
  })

  /* Prop: `smoothScroll` */

  it('adds smooth scroll to document when `smoothScroll` is true', () => {
    cy.mount(
      <TestLayout>
        <PageContents smoothScroll />
      </TestLayout>
    )
    cy.get('html').should('have.css', 'scroll-behavior', 'smooth')
  })

  /* Prop: `css`, `psuedoCss` */

  it('supports `css` and `pseudoCss` props with default props', () => {
    cy.mount(
      <TestLayout>
        <PageContents
          data-cy="content-menu"
          marker="before"
          css={{ top: 80, li: { listStyleType: 'none' } }}
          pseudoCss={{ borderColor: '#c53030' }}
        />
      </TestLayout>
    )
    cy.get('[data-cy="content-menu"]').should('have.css', 'top', '80px')
    cy.get('li a').should('have.css', 'content')
  })

  /* Behavior: adds the right ID selector to each link */

  it('adds the correct ID destination to each ToC link', () => {
    cy.mount(
      <TestLayout>
        <PageContents />
      </TestLayout>
    )
    cy.get('li').eq(0).find('a').should('have.attr', 'href', '#heading-1')
    cy.get('.level-1 a').should('have.attr', 'href', '#sub-1')
    cy.get('.level-1 a').click()
    cy.url().should('include', '#')
  })

  /* Behavior: rescans DOM on route change via pathname */

  // it('rescans DOM on route change with the `pathname` prop', () => {
  //   cy.mount(
  //     <TestLayout>
  //       <PageContents
  //         marker="before"
  //         css={{ top: 80, li: { listStyleType: 'none' } }}
  //         pseudoCss={{ borderColor: '#c53030' }}
  //       />
  //     </TestLayout>
  //   )
  //   cy.get('.toc').should('have.css', 'top', '80px')
  //   cy.get('.toc li a').should('have.css', 'content')
  // })
})
