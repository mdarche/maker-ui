import {
  Layout as MakerLayout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
} from 'maker-ui'
import { useRouter } from 'next/router'

import { Logo } from '../Logo'
import { options } from './options'
import { primary_menu, mobile_menu } from './menus'
import { styles } from '../../styles'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Wraps your application in a responsive, customizable layout system.
 * You can configure this in `./options`
 *
 * @param {ReactNode} children
 */
export const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter()

  return (
    <MakerLayout options={options} styles={styles}>
      <Header>
        <Navbar logo={<Logo />} menu={primary_menu} />
        <MobileMenu menu={mobile_menu} pathname={asPath} />
      </Header>
      <Content>
        <Main>{children}</Main>
      </Content>
      <Footer>copyright</Footer>
    </MakerLayout>
  )
}
