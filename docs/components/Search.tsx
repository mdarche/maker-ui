import { Flex, Button, Span } from 'maker-ui'

import { SearchIcon } from './Icons'

export const Search = () => {
  return (
    <Button
      css={{
        height: 46,
        margin: '5px 0',
        width: '100%',
        maxWidth: '40%',
        minWidth: 330,
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
  )
}
