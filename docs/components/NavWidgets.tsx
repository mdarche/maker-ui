import { Div, Flex, Button } from 'maker-ui'
import { Dropdown } from '@maker-ui/components'
import { GithubIcon, PaintIcon, CaretIcon } from './Icons'

export const NavWidgets = () => {
  return (
    <Flex
      align="center"
      justify="center"
      css={{ svg: { fill: 'var(--color-header_fill)' } }}>
      {/* <Flex className="version" align="center" css={{ marginRight: 70 }}>
        <Div
          css={{
            padding: '5px 10px',
            border: '1px solid',
            borderColor: 'var(--color-border)',
            background: 'var(--color-bg_sideNav)',
            marginRight: 15,
            fontWeight: 700,
          }}>
          Latest
        </Div>
        v1.0.0
      </Flex> */}
      <a
        href="https://github.com/mdarche/maker-ui"
        target="_blank"
        rel="noopener noreferrer">
        <GithubIcon css={{ height: 25 }} />
      </a>
      <Button
        css={{
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          outline: 'none',
          border: 'none',
          fontSize: 17,
          marginLeft: 50,
        }}>
        <PaintIcon css={{ height: 20, marginTop: -4, marginRight: 10 }} />
        Classic
        <CaretIcon css={{ height: 4, marginLeft: 5 }} />
      </Button>
    </Flex>
  )
}
