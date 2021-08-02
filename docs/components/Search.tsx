import { Flex, Button, Span, mergeSelectors } from 'maker-ui'
import Link from 'next/link'

import { SearchIcon } from './Icons'

interface SearchProps {
  pathname: string
}

export const Search = ({ pathname }: SearchProps) => {
  function getClass(key: string) {
    return mergeSelectors(['nav-link', pathname.includes(key) ? 'active' : ''])
  }
  return (
    <Flex
      align="center"
      css={{
        '.nav-link': {
          fontWeight: 500,
          padding: '0 18px',
          position: 'relative',
          '&.active:after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            right: 0,
            bottom: -25,
            height: 2,
            width: 50,
            transform: 'translateX(-50%)',
            background: 'var(--color-primary)',
          },
        },
      }}>
      <div>
        <Link href="/docs/overview/">
          <a className={getClass('docs')}>Docs</a>
        </Link>
        <Link href="/guides/">
          <a className={getClass('guides')}>Guides</a>
        </Link>
      </div>
      <Button
        css={{
          height: 46,
          margin: '5px 0 5px 60px',
          width: '100%',
          maxWidth: '30%',
          minWidth: 420,
          background: 'var(--color-bg_sideNav)',
          border: '1px solid',
          borderColor: 'var(--color-border_dark)',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 16,
          color: 'var(--color-muted)',
          padding: '0 15px',
        }}>
        <Flex align="center" css={{ flex: 1 }}>
          <SearchIcon
            css={{
              height: 22,
              fill: 'var(--color-header_fill)',
              marginRight: 10,
            }}
          />
          <span>Search docs</span>
        </Flex>
        <Flex
          css={{
            span: {
              border: '1px solid',
              borderColor: 'var(--color-border_dark)',
              height: 28,
              width: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              fontSize: 13,
              background: 'var(--color-bg_header)',
            },
          }}>
          <Span className="key-shortcut" css={{ marginRight: 5 }}>
            ⌘
          </Span>
          <span className="key-shortcut">K</span>
        </Flex>
      </Button>
    </Flex>
  )
}
