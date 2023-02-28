import * as React from 'react'
import { SocialAccounts } from '../src'

describe('SocialAccounts', () => {
  it('renders all automatically supported social media platforms with default props', () => {
    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com/makeruijs',
          instagram: 'https://instagram.com/makeruijs',
          tiktok: 'https://tiktok.com/makeruijs',
          linkedin: 'https://linkedin.com/makeruijs',
          facebook: 'https://facebook.com/makeruijs',
          website: 'https://maker-ui.com',
          youtube: 'https://youtube.com/makeruijs',
        }}
      />
    )
    cy.get('a').should('have.length', 7)
    cy.get('ul').should('have.css', 'flex-direction', 'row')
    cy.get('svg').first().should('have.css', 'height', '22px')
    cy.get('svg').first().should('have.css', 'width', '22px')
    cy.get('a').first().should('have.css', 'padding-right', '10px')
    cy.get('a').first().should('have.css', 'padding-left', '10px')
    cy.get('a').last().should('have.css', 'padding-right', '10px')
  })

  it('renders all automatically supported social media platforms with custom props', () => {
    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com/makeruijs',
          instagram: 'https://instagram.com/makeruijs',
          tiktok: 'https://tiktok.com/makeruijs',
          linkedin: 'https://linkedin.com/makeruijs',
          facebook: 'https://facebook.com/makeruijs',
          website: 'https://maker-ui.com',
          youtube: 'https://youtube.com/makeruijs',
        }}
        color="rgb(255, 0, 0)"
        iconSize={30}
        justify="center"
        spacing={20}
        trim
        vertical
      />
    )
    cy.get('a').should('have.length', 7)
    cy.get('ul').should('have.css', 'flex-direction', 'column')
    cy.get('ul').should('have.css', 'justify-content', 'center')
    cy.get('svg').first().should('have.css', 'height', '30px')
    cy.get('svg').first().should('have.css', 'width', '30px')
    cy.get('svg').first().should('have.css', 'fill', 'rgb(255, 0, 0)')
    cy.get('a').first().should('have.css', 'padding-top', '0px')
    cy.get('a').first().should('have.css', 'padding-bottom', '20px')
    cy.get('a').last().should('have.css', 'padding-bottom', '0px')
  })

  it('supports custom icons when necessary', () => {
    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com',
          custom: {
            url: 'https://google.com',
            icon: (
              <div
                data-cy="custom-icon"
                style={{ color: 'rgb(255,255,255)', background: 'rgb(0,0,0)' }}>
                custom icon!
              </div>
            ),
          },
          facebook: 'https://facebook.com',
        }}
      />
    )
    cy.get('a').should('have.length', 3)
    cy.get('[data-cy="custom-icon"]').contains('custom icon!')
  })

  it.only('properly trims icon padding', () => {
    // Horizontal
    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com/makeruijs',
          instagram: 'https://instagram.com/makeruijs',
          tiktok: 'https://tiktok.com/makeruijs',
        }}
        trim="first"
      />
    )
    cy.get('a').first().should('have.css', 'padding-left', '0px')

    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com/makeruijs',
          instagram: 'https://instagram.com/makeruijs',
          tiktok: 'https://tiktok.com/makeruijs',
        }}
        trim="last"
      />
    )
    cy.get('a').last().should('have.css', 'padding-right', '0px')
    // Vertical

    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com/makeruijs',
          instagram: 'https://instagram.com/makeruijs',
          tiktok: 'https://tiktok.com/makeruijs',
        }}
        trim="first"
        vertical
      />
    )
    cy.get('a').first().should('have.css', 'padding-top', '0px')

    cy.mount(
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com/makeruijs',
          instagram: 'https://instagram.com/makeruijs',
          tiktok: 'https://tiktok.com/makeruijs',
        }}
        trim="last"
        vertical
      />
    )
    cy.get('a').last().should('have.css', 'padding-bottom', '0px')
  })
})
