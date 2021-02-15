import * as React from 'react'
import { MobileMenu, Header, Navbar, MakerUIOptions, MenuProps } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, testMenu } from '../setup'

interface TestMobileMenuProps {
  options?: MakerUIOptions
  children?: React.ReactNode
  menu?: MenuProps[]
  [key: string]: any
}

const TestMobileMenu = ({
  menu = testMenu,
  options,
  children,
  ...props
}: TestMobileMenuProps) => (
  <Wrapper content footer options={options}>
    <Header>
      <Navbar logo="Logo" menu={menu} />
      <MobileMenu menu={menu} {...props}>
        {children}
      </MobileMenu>
    </Header>
  </Wrapper>
)

describe('MobileMenu component', () => {
  it('renders the MobileMenu component with default props', () => {
    mount(<TestMobileMenu />)
  })
})
