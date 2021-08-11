import * as React from 'react'
import { Generate } from '@maker-ui/elements'
import { mount } from '@cypress/react'

const Card = ({ title }: { title?: string }) => (
  <div className="card">{title}</div>
)
const cardProps = [
  { title: 'Card 1' },
  { title: 'Card 2' },
  { title: 'Card 3' },
]

const cardArray = [
  <Card title="Component 1" />,
  <Card title="Component 2" />,
  <Card title="Component 3" />,
]

describe('Generate component', () => {
  it('randomly orders a basic component template', () => {
    mount(
      <Generate data={cardProps}>
        <Card />
      </Generate>
    )
    cy.get('.card').should('have.length', 3)
    cardProps.forEach(({ title }) => cy.contains(title))
    mount(
      <Generate data={cardProps}>
        <Card />
      </Generate>
    )
    cardProps.forEach(({ title }) => cy.contains(title))
  })

  it('randomly orders a basic component template with a specified count', () => {
    mount(
      <Generate data={cardProps} count={2}>
        <Card />
      </Generate>
    )
    cy.get('.card').should('have.length', 2)
  })

  it('randomly orders an array of components', () => {
    mount(<Generate data={cardArray} />)
    cy.get('.card').should('have.length', 3)
  })

  it('randomly orders an array of components with a specified count', () => {
    mount(<Generate data={cardArray} count={2} />)
    cy.get('.card').should('have.length', 2)
  })
})
