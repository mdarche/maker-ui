import * as React from 'react'
import { TableofContents } from '@maker-ui/components'
import { Content, Main, MakerUIOptions, Sidebar } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

interface TestLayoutProps {
  children: React.ReactNode
  options?: MakerUIOptions
}

const TestLayout = ({
  children,
  options = { sidebar: { width: 300 } },
}: TestLayoutProps) => (
  <Wrapper options={options} header footer>
    <Content>
      <Main>
        <h2 id="heading-1">Heading 1</h2>
        <div className="test-div" style={{ height: 500 }}>
          content
        </div>
        <h3 id="sub-1">Subheading 1</h3>
        <div style={{ height: 300 }}>content</div>
        <h2 id="heading-2">Heading 2</h2>
        <div style={{ height: 500 }}>content</div>
        <h2 id="heading-3">Heading 3</h2>
        <h4 id="sub-2">Subheading 2</h4>
        <div style={{ height: 900 }}>content</div>
      </Main>
      <Sidebar>{children}</Sidebar>
    </Content>
  </Wrapper>
)

describe('TableofContents component', () => {
  it('renders with default props', () => {
    mount(
      <TestLayout>
        <TableofContents />
      </TestLayout>
    )
    cy.get('.toc-headings li').should('have.length', 5)
    cy.get('.level-1').should('have.css', 'padding-left', '10px')
    cy.get('.level-2').should('have.css', 'padding-left', '20px')
    cy.viewport('iphone-x')
      .get('.toc')
      .should('have.css', 'display', 'none')
  })

  it('supports a custom title component', () => {
    mount(
      <TestLayout>
        <TableofContents title={<h2>Table of Contents</h2>} />
      </TestLayout>
    )
    cy.get('.toc h2').contains('Table of Contents')
  })

  it('searches for specific heading tags', () => {
    mount(
      <TestLayout>
        <TableofContents headings={[2]} />
      </TestLayout>
    )
    cy.get('.toc-headings li').should('have.length', 3)
  })

  it("highlights the viewport's active section heading", () => {
    mount(
      <TestLayout>
        <TableofContents activeColor="#3efd83" />
      </TestLayout>
    )
    cy.get('.test-div').scrollTo('center')
    cy.get('.toc-headings li')
      .eq(0)
      .find('a')
      .should('have.class', 'active')
    cy.get('.active').should('have.color', '#3efd83')
  })

  it('can flatten headings and remove indentation', () => {
    mount(
      <TestLayout>
        <TableofContents indent={false} />
      </TestLayout>
    )
    cy.get('.level-1 a').should('have.css', 'padding-left', '0px')
  })

  it('supports custom indentation', () => {
    mount(
      <TestLayout>
        <TableofContents indentSize={5} />
      </TestLayout>
    )
    cy.get('.level-1').should('have.css', 'padding-left', '5px')
    cy.get('.level-2').should('have.css', 'padding-left', '10px')
  })

  // it('renders a marker before', () => {})

  // it('renders a marker after', () => {})

  it('adds the correct ID destination to each ToC link', () => {
    mount(
      <TestLayout>
        <TableofContents />
      </TestLayout>
    )
    cy.get('.toc-headings li')
      .eq(0)
      .find('a')
      .should('have.attr', 'href', '#heading-1')
    cy.get('.level-1 a').should('have.attr', 'href', '#sub-1')
    cy.get('.level-1 a').click()
  })

  it('adds smooth scroll to document when `smoothScroll` is true', () => {
    mount(
      <TestLayout>
        <TableofContents smoothScroll />
      </TestLayout>
    )
    cy.get('html').should('have.css', 'scroll-behavior', 'smooth')
  })

  it('supports `css` and `pseudoCss` props with default props', () => {
    mount(
      <TestLayout>
        <TableofContents
          marker="before"
          css={{ top: 80, li: { listStyleType: 'none' } }}
          pseudoCss={{ borderColor: '#c53030' }}
        />
      </TestLayout>
    )
    cy.get('.toc').should('have.css', 'top', '80px')
    cy.get('.toc li a').should('have.css', 'content')
  })
})

// Figure out how to test pseudo selectors
