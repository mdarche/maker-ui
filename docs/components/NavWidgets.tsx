import { Div, Flex, Button } from 'maker-ui'
import { Dropdown } from '@maker-ui/components'
import Link from 'next/link'
import { GithubIcon, PaintIcon, CaretIcon } from './Icons'

export const NavWidgets = () => {
  return (
    <Flex
      align="center"
      justify="center"
      css={{ svg: { fill: 'var(--color-header_fill)' } }}>
      <Link href="/docs/overview">Docs</Link>
      <Link href="/guides">Guides</Link>
      <a
        href="https://github.com/mdarche/maker-ui"
        target="_blank"
        rel="noopener noreferrer">
        <GithubIcon css={{ height: 25 }} />
      </a>
      <Dropdown
        buttonCss={{
          marginLeft: 50,
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          outline: 'none',
          border: 'none',
          fontSize: 17,
        }}
        button={
          <>
            <PaintIcon css={{ height: 20, marginTop: -4, marginRight: 10 }} />
            Classic
            <CaretIcon css={{ height: 4, marginLeft: 5 }} />
          </>
        }>
        Content
      </Dropdown>
    </Flex>
  )
}
