/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react'
import { Grid, MenuItemProps, Span } from 'maker-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { flatten } from './utils'
import { menu } from './Layout/menus'

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

  const { asPath } = useRouter()

  /**
   * Update the next / previous links via `navButtons`
   */

  React.useEffect(() => {
    if (flatMenu) {
      // If the current menu exists, determine the next / previous pages
      const length = flatMenu.length
      const index = flatMenu.findIndex((i: MenuItemProps) => i.path === asPath)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  return asPath.includes('/docs') ? (
    <Grid
      className="post-pagination"
      columns={['1fr', '1fr 1fr']}
      gap={[20, '20%']}
      css={{
        flexWrap: 'wrap',
        marginTop: [60, 100],
        a: {
          width: ['100%', 'auto'],
          display: 'flex',
          flexDirection: 'column',
        },
        '.pagination': {
          border: '1px solid',
          borderColor: 'var(--color-border)',
          padding: '15px 25px',
          borderRadius: 3,
          fontWeight: 700,
          transition: 'all ease 0.3s',
          '&:hover': {
            borderColor: 'var(--color-border_dark)',
            backgroundColor: 'var(--color-bg_sideNav)',
            transform: 'translateY(-5px)',
          },
        },
        '.pagination-label': {
          fontSize: 12,
          marginBottom: 0,
          color: 'var(--color-primary)',
        },
        '.pagination-title': {
          fontSize: 16,
          color: 'var(--color-text)',
        },
        '.next': {
          textAlign: 'right',
        },
      }}>
      {navButtons.prev?.path ? (
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
      {navButtons.next?.path ? (
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
    </Grid>
  ) : null
}
