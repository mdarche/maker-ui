import * as React from 'react'
import { Style, type StyleProps } from '../src/Style'

const defaultRoot = 'test'

const TestComponent = ({ root, ...props }: Partial<StyleProps>) => {
  return (
    <div className={defaultRoot}>
      <Style data-cy="style" root={root ?? defaultRoot} {...props} />
      <div className="inner" data-cy="inner">
        Inner text
      </div>
    </div>
  )
}

describe('Style', () => {
  it('renders a style tag with default props', () => {
    cy.mount(<TestComponent />)
    cy.get('[data-cy="style"]')
  })

  it('renders any nested style rules as children (normal style tag behavior)', () => {
    cy.mount(<TestComponent>{`.child-test { color: red; }`}</TestComponent>)
    cy.get('[data-cy="style"]').then((el) => {
      expect(el.get(0).innerHTML).to.equal('.child-test { color: red; }')
    })
  })

  it('renders a style tag and appends CSS to the root with a custom selector', () => {
    cy.mount(<TestComponent css={{ color: 'rgb(100,0,0)' }} />)
    cy.get('[data-cy="style"]').then((el) => {
      expect(el.get(0).innerHTML).to.equal('.test {color: rgb(100,0,0);}')
    })
    expect(
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(100, 0, 0)')
    )
  })

  it.only('uses the default breakpoints for array-based media queries', () => {
    cy.mount(
      <TestComponent
        css={{ color: ['rgb(0,100,0)', 'rgb(100,0,0)', 'rgb(0,0,100)'] }}
      />
    )
    cy.get('[data-cy="style"]').then((el) => {
      expect(el.get(0).innerText).to.equal(
        '.test {color: rgb(0,100,0);} @media screen and (min-width: 960px) { .test { color: rgb(0,0,100);}} @media screen and (min-width: 768px) { .test { color: rgb(100,0,0);}}'
      )
    })
  })

  it('supports custom breakpoints for array-based media queries', () => {
    cy.viewport(1000, 600)
    cy.mount(
      <TestComponent
        breakpoints={[500, 960]}
        css={{ color: ['rgb(0,100,0)', 'rgb(100,0,0)', 'rgb(0,0,100)'] }}
      />
    )
    cy.get('[data-cy="style"]').then((el) => {
      expect(el.get(0).innerText).to.equal(
        '.test {color: rgb(0,100,0);} @media screen and (min-width: 960px) { .test { color: rgb(0,0,100);}} @media screen and (min-width: 500px) { .test { color: rgb(100,0,0);}}'
      )
    })
  })
})
