import { Flex } from 'maker-ui'
import { TableofContents as MakerToc } from '@maker-ui/components'

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
      title={
        <Flex
          align="center"
          css={{
            svg: { height: 12, marginRight: 15, fill: 'var(--color-primary)' },
            fontWeight: 700,
            fontSize: 14,
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
        borderLeft: '1px solid',
        paddingLeft: 20,
        borderColor: 'var(--color-border)',
        ul: {
          lineHeight: 1.5,
          listStyleType: 'none',
          paddingLeft: 20,
        },
        a: {
          display: 'block',
          fontSize: 13,
          padding: 5,
          color: '#555',
        },
      }}
    />
  )
}
