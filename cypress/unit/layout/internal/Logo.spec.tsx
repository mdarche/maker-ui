import * as React from 'react'
import { Logo } from '@maker-ui/layout/src/components/Navbar/Logo'
import { mount } from '@cypress/react'

import { Wrapper } from '../../setup'

describe('Logo component (internal)', () => {
  it('renders with default props', () => {
    mount(
      <Wrapper>
        <Logo>Logo</Logo>
      </Wrapper>
    )
    cy.get('#site-logo').should('have.attr', 'href', '/')
  })

  // it('supports a custom `linkFunction` from options', () => {
  //   mount(
  //     <Wrapper
  //       options={{
  //         linkFunction: (path, children, attributes) => (
  //           <div {...attributes} className="custom-wrapper-class">
  //             <a href={path}>{children}</a>
  //           </div>
  //         ),
  //       }}>
  //       <Logo>Custom Link Wrapper</Logo>
  //     </Wrapper>
  //   )
  //   cy.get('#site-logo').should('have.class', 'custom-link-class')
  // })
})
