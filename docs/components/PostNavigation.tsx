import * as React from 'react'
import { Flex, MenuProps, Span, Link } from 'maker-ui'
// import Link from 'next/link'
import { useRouter } from 'next/router'

import { flatten } from './utils'
import { menu } from '../config/menus'

interface ButtonProps {
  title: string
  path: string
}

interface NavButtonState {
  next?: ButtonProps
  prev?: ButtonProps
}

export const PostNavigation = ({ pageTitle = true }) => {
  const [navButtons, setNavButtons] = React.useState<NavButtonState>({})
  const flatMenu = flatten(menu)
  console.log('navButtons are', navButtons)

  const { asPath } = useRouter()

  /**
   * Update the next / previous links via `navButtons`
   */

  React.useEffect(() => {
    if (flatMenu) {
      // If the current menu exists, determine the next / previous pages
      const length = flatMenu.length
      const index = flatMenu.findIndex(i => i.path === asPath)
      console.log('index is', index)
      setNavButtons({
        prev: index !== 0 && {
          title: flatMenu[index - 1]?.label,
          path: flatMenu[index - 1]?.path,
        },
        next: index !== length - 1 && {
          title: flatMenu[index + 1]?.label,
          path: flatMenu[index + 1]?.path,
        },
      })
    }
  }, [asPath])

  return asPath.includes('/docs') ? (
    <Flex
      className="post-pagination"
      justify="space-between"
      align="center"
      css={{
        flexWrap: 'wrap',
        a: {
          width: ['100%', 'auto'],
          display: 'flex',
          flexDirection: 'column',
        },
      }}>
      {navButtons.prev ? (
        <Link href={navButtons.prev.path}>
          <a className="pagination prev">
            <Span className="pagination-label">Previous</Span>
            {pageTitle && (
              <Span className="pagination-title">{navButtons.prev.title}</Span>
            )}
          </a>
        </Link>
      ) : (
        <div />
      )}
      {navButtons.next ? (
        <Link href={navButtons.next.path}>
          <a className="pagination next">
            <Span className="pagination-label">Next</Span>
            {pageTitle && (
              <Span className="pagination-title">{navButtons.next.title}</Span>
            )}
          </a>
        </Link>
      ) : (
        <div />
      )}
    </Flex>
  ) : null
}
