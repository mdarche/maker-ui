import * as React from 'react'
import { Header, Topbar } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper } from '../setup'

describe('Header component - unit tests', () => {
  it('renders the Header with default props', () => {
    mount(
      <Wrapper>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.backgroundColor', 'var(--color-bg_header)')
    cy.get('header').should('have.css', 'position', 'relative')
  })

  it('renders with user-generated options', () => {
    mount(
      <Wrapper
        options={{
          colors: { light: { bg_header: '#000' } },
          header: { sticky: true },
        }}>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.backgroundColor', '#000')
    cy.get('header').should('have.css', 'position', 'sticky')
  })

  it('supports stickyOnMobile option', () => {
    mount(
      <Wrapper options={{ header: { stickyOnMobile: true } }}>
        <Header background="#000">inner</Header>
      </Wrapper>
    )
    cy.viewport('iphone-x')
    cy.get('header').should('have.css', 'position', 'sticky')
  })

  it('supports stickyUpScroll option', () => {
    mount(
      <Wrapper options={{ header: { stickyUpScroll: true } }}>
        <Header background="#000">inner</Header>
        <div style={{ height: 3000 }}></div>
      </Wrapper>
    )
    cy.scrollTo(0, 750)
    cy.get('header').should('have.class', 'scroll-active')
    cy.scrollTo(0, 300)
    cy.get('header').should('not.have.class', 'scroll-active')
  })

  it('supports scrollClass option', () => {
    mount(
      <Wrapper
        options={{
          header: { scrollClass: { scrollTop: 300, className: 'test-class' } },
        }}>
        <Header background="#000">inner</Header>
        <div style={{ height: 3000 }}></div>
      </Wrapper>
    )
    cy.scrollTo(0, 400)
    cy.get('header').should('have.class', 'test-class')
    cy.scrollTo(0, 0)
    cy.get('header').should('not.have.class', 'test-class')
  })

  it('supports the absolute option', () => {
    mount(
      <Wrapper options={{ header: { absolute: true } }}>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.css', 'position', 'absolute')
  })

  it('prioritizes prop values', () => {
    mount(
      <Wrapper>
        <Header background="#000" absolute stickyOnMobile>
          inner
        </Header>
      </Wrapper>
    )
    cy.get('header').should('have.backgroundColor', '#000')
    cy.get('header').should('have.css', 'position', 'absolute')
    cy.viewport('iphone-x')
    cy.get('header').should('have.css', 'position', 'fixed')
  })

  it('transforms absolute into fixed positioning when sticky', () => {
    mount(
      <Wrapper>
        <Header sticky absolute>
          inner
        </Header>
      </Wrapper>
    )
    cy.get('header').should('have.css', 'position', 'fixed')
  })

  it('uses the Topbar height to calculate its top position when Topbar is sticky', () => {
    mount(
      <Wrapper options={{ topbar: { sticky: true }, header: { sticky: true } }}>
        <Topbar css={{ height: 60 }}>text</Topbar>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.css', 'top', '60px')
  })
})
