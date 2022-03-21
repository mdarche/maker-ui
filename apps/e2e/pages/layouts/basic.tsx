import {
  Layout,
  Content,
  Header,
  Main,
  Footer,
  Navbar,
  MobileMenu,
} from 'maker-ui'
import { primary_menu, mobile_menu, options } from '../../components/Layout'
import { Logo } from '../../components/Logo'
import { styles } from '../../styles'

export default function BasicPage() {
  return (
    <Layout options={options} styles={styles}>
      <Header>
        <Navbar logo={<Logo />} menu={primary_menu} />
        <MobileMenu menu={mobile_menu} />
      </Header>
      <Content>
        <Main>Main content</Main>
      </Content>
      <Footer />
    </Layout>
  )
}
