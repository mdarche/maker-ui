import { Flex } from 'maker-ui'
import { DocSearch } from '@docsearch/react'

export const Search = () => {
  return (
    <Flex
      align="center"
      css={{
        button: {
          height: 46,
          margin: '5px 0 5px 150px',
          width: '100%',
          maxWidth: '30%',
          minWidth: 320,
          background: 'var(--color-bg_sideNav)',
          border: '1px solid',
          borderColor: 'var(--color-border_dark)',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 16,
          color: 'var(--color-muted)',
          fontWeight: 400,
          padding: '0 15px',
          transition: 'all ease 0.3s',
        },
        svg: { height: 22, fill: 'var(--color-header_fill)', marginRight: 10 },
        '.DocSearch-Button-Key': {
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
          boxShadow: 'none',
          padding: 0,
        },
      }}>
      <DocSearch
        appId="BH4D9OD16A"
        indexName="maker-ui"
        apiKey="375203709e8b66acf3df920a0129ecc4"
      />
    </Flex>
  )
}
