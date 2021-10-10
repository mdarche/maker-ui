import { Flex } from 'maker-ui'
import { TableofContents as MakerToc } from '@maker-ui/elements'

import { ContentIcon } from './Icons'

interface PageContentsProps {
  pathname: string
}

/**
 * The TableofContents component shows on-page links to all nested headings
 * on the page.
 *
 * @param pathname - the app's current location.pathname
 */

export const PageContents = ({ pathname }: PageContentsProps) => {
  return (
    <MakerToc
      breakpoints={[1200]}
      pathname={pathname}
      indentSize={12}
      title={
        <Flex
          align="center"
          css={{
            svg: { height: 10, marginRight: 15, fill: 'var(--color-primary)' },
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
          <ContentIcon /> Contents
        </Flex>
      }
      activeColor="var(--color-link)"
      hideOnMobile
      sticky
      css={{
        display: ['none', 'block'],
        top: 120,
        paddingLeft: 20,
        ul: {
          lineHeight: 1.5,
          listStyleType: 'none',
          paddingLeft: 20,
        },
        a: {
          display: 'block',
          fontSize: 13,
          padding: '5px 0',
          color: '#555',
        },
        '.level-1, .level-2': {
          borderLeft: '1px solid',
          borderColor: 'var(--color-border)',
          marginLeft: 3,
        },
      }}
    />
  )
}
