import * as React from 'react'
import { Style, type StyleProps } from '../src/Style'

const defaultRoot = 'test'

const TestComponent = ({ root, ...props }: Partial<StyleProps>) => {
  return (
    <div className={defaultRoot}>
      <Style data-cy="style" root={root ?? defaultRoot} {...props} />
      <div className="inner" data-cy="inner">
        Inner text
        <button>
          <span>link</span>
        </button>
        <div className="custom-class">box 1</div>
        <div id="custom-id">box 2</div>
      </div>
    </div>
  )
}

const GlobalComponent = (props: Partial<StyleProps>) => {
  return (
    <div className="content">
      <div className="custom-class">box 1</div>
      <Style data-cy="style" {...props} />
      <div className="inner" data-cy="inner">
        Inner text
        <button>
          <span>link</span>
        </button>
      </div>
      <div id="custom-id">box 2</div>
    </div>
  )
}

describe('Style', () => {
  describe('locally scoped', () => {
    it('renders a style tag with default props', () => {
      cy.mount(<TestComponent />)
      cy.get('[data-cy="style"]')
    })

    it('renders any nested style rules as children (normal style tag behavior)', () => {
      cy.mount(
        <TestComponent>{`.inner { color: rgb(100,0,0); }`}</TestComponent>
      )
      expect(
        cy
          .get('[data-cy="inner"]')
          .should('have.css', 'color', 'rgb(100, 0, 0)')
      )
    })

    it('renders a style tag and appends CSS to the root with a custom selector', () => {
      cy.mount(<TestComponent css={{ '.inner': { color: 'rgb(100,0,0)' } }} />)
      expect(
        cy
          .get('[data-cy="inner"]')
          .should('have.css', 'color', 'rgb(100, 0, 0)')
      )
    })

    it('uses the default breakpoints for array-based media queries', () => {
      // Defaults are [768, 960, 1440] - 2/28/23
      cy.viewport(2100, 900)
      cy.mount(
        <TestComponent
          css={{
            color: [
              'rgb(0, 100, 0)',
              'rgb(100, 0, 0)',
              'rgb(0, 0, 100)',
              'rgb(88, 8, 88)',
            ],
          }}
        />
      )
      cy.viewport(1200, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(0, 0, 100)')
      cy.viewport(900, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(100, 0, 0)')
      cy.viewport(300, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(0, 100, 0)')
    })

    it('supports custom breakpoints for array-based media queries', () => {
      cy.viewport(1200, 600)
      cy.mount(
        <TestComponent
          breakpoints={[500, 760, 1000]}
          css={{
            color: [
              'rgb(0, 100, 0)',
              'rgb(100, 0, 0)',
              'rgb(0, 0, 100)',
              'rgb(88, 8, 88)',
            ],
          }}
        />
      )
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(88, 8, 88)')
      cy.viewport(900, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(0, 0, 100)')
      cy.viewport(700, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(100, 0, 0)')
      cy.viewport(400, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(0, 100, 0)')
    })

    it('can print complex style objects', () => {
      cy.viewport(1300, 600)
      // Test hover manually to see if color changes to bright purple. Revisit this when Cypress has official support for hover pseudo classes.
      cy.mount(
        <TestComponent
          breakpoints={[500, 700, 1200]}
          css={{
            color: [
              'rgb(0, 100, 0)',
              'rgb(100, 0, 0)',
              'rgb(0, 0, 100)',
              'rgb(88, 8, 88)',
            ],
            button: {
              fontSize: 12,
              '&:hover': {
                color: 'rgb(255 192 0)',
              },
              span: {
                border: '1px solid',
                borderColor: ['rgb(100, 0, 0)', 'rgb(0, 0, 100)'],
                fontFamily: 'Arial',
              },
            },
            '#custom-id': {
              paddingTop: 10,
            },
            fontSize: 20,
            '.custom-class': {
              marginLeft: [10, 30],
            },
          }}
        />
      )
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(88, 8, 88)')
      cy.get('[data-cy="inner"]').should('have.css', 'font-size', '20px')
      cy.get('.custom-class').should('have.css', 'margin-left', '30px')
      cy.get('#custom-id').should('have.css', 'padding-top', '10px')
      cy.get('[data-cy="inner"] button').should('have.css', 'font-size', '12px')
      cy.get('[data-cy="inner"] span').should(
        'have.css',
        'font-family',
        'Arial'
      )
      cy.get('[data-cy="inner"] span').should(
        'have.css',
        'border-color',
        'rgb(0, 0, 100)'
      )
      cy.viewport(1000, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(0, 0, 100)')
      cy.viewport(600, 600)
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(100, 0, 0)')
      cy.viewport(400, 600)
      cy.get('.custom-class').should('have.css', 'margin-left', '10px')
      cy.get('[data-cy="inner"]').should('have.css', 'color', 'rgb(0, 100, 0)')
      cy.get('[data-cy="inner"] span').should(
        'have.css',
        'border-color',
        'rgb(100, 0, 0)'
      )
    })
  })

  describe('global', () => {
    it('renders a style tag with default props', () => {
      cy.mount(<GlobalComponent />)
      cy.get('[data-cy="style"]')
    })

    it('supports a custom css expression', () => {
      cy.mount(
        <GlobalComponent
          mediaQuery="max-width"
          css={{ button: { fontSize: [10, 12] } }}
        />
      )
      cy.get('[data-cy="style"]')
      expect(cy.get('button').should('have.css', 'font-size', '10px'))
      cy.viewport(500, 600)
      expect(cy.get('button').should('have.css', 'font-size', '12px'))
    })

    it('ignores any styles on the root css object', () => {
      cy.mount(
        <GlobalComponent css={{ color: 'rgb(100, 0, 0)', fontSize: 12 }} />
      )
      expect(cy.get('body').should('not.have.css', 'color', 'rgb(100, 0, 0)'))
      expect(cy.get('body').should('not.have.css', 'font-size', '12px'))
    })

    it('applies nested style rules properly', () => {
      cy.mount(
        <GlobalComponent
          breakpoints={[500]}
          css={{
            color: 'rgb(100, 0, 0)',
            button: {
              padding: 10,
              '&:hover': {
                color: 'rgb(255 192 0)',
              },
              span: {
                border: '1px solid',
                borderColor: ['rgb(100, 0, 0)', 'rgb(0, 0, 100)'],
                fontFamily: 'Arial',
              },
            },
            '#custom-id': {
              paddingTop: 10,
            },
            '.custom-class': {
              marginLeft: [10, 30],
            },
          }}
        />
      )
      expect(cy.get('body').should('not.have.css', 'color', 'rgb(100, 0, 0)'))
      expect(cy.get('button').should('have.css', 'padding', '10px'))
      expect(
        cy.get('span').should('have.css', 'border-color', 'rgb(0, 0, 100)')
      )
      expect(cy.get('span').should('have.css', 'font-family', 'Arial'))
      cy.get('.custom-class').should('have.css', 'margin-left', '30px')
      cy.get('#custom-id').should('have.css', 'padding-top', '10px')
      cy.viewport(400, 600)
      cy.get('.custom-class').should('have.css', 'margin-left', '10px')
      cy.get('span').should('have.css', 'border-color', 'rgb(100, 0, 0)')
    })
  })
})
