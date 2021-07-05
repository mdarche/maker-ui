import { Div, Flex, Button, mergeSelectors } from 'maker-ui'
import { Dropdown } from '@maker-ui/components'
import Link from 'next/link'
import { GithubIcon, PaintIcon, CaretIcon } from './Icons'

interface NavWidgetProps {
  pathname: string
}

export const NavWidgets = ({ pathname }: NavWidgetProps) => {
  function getClass(key: string) {
    return mergeSelectors(['nav-link', pathname.includes(key) ? 'active' : ''])
  }

  return (
    <Flex
      align="center"
      justify="center"
      css={{
        svg: { fill: 'var(--color-header_fill)' },
        '.nav-link': {
          fontWeight: 500,
          padding: '0 15px',
        },
        '.github-link': {
          marginLeft: 30,
        },
      }}>
      <Link href="/docs/overview/">
        <a className={getClass('docs')}>Docs</a>
      </Link>
      <Link href="/guides/">
        <a className={getClass('guides')}>Guides</a>
      </Link>
      <a
        className="github-link"
        href="https://github.com/mdarche/maker-ui"
        target="_blank"
        rel="noopener noreferrer">
        <GithubIcon css={{ height: 23 }} />
      </a>
      <Dropdown
        _css={{ marginLeft: 50 }}
        buttonCss={{
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
