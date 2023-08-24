'use client'

import { useEffect, useState } from 'react'
import type { MenuItem } from 'maker-ui/layout'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { sideMenu } from '@/menus'
import { flattenMenu } from '../utils/flatten-menu'

interface ButtonProps {
  title: string
  path: string
}

interface NavButtonState {
  next?: ButtonProps
  prev?: ButtonProps
}

const flatMenu = flattenMenu(sideMenu)

export const PostNavigation = ({
  pageTitle = true,
}: {
  pageTitle?: boolean
}) => {
  const [navButtons, setNavButtons] = useState<NavButtonState>({})
  const pathname = usePathname()

  useEffect(() => {
    if (flatMenu) {
      // If the current menu exists, determine the next / previous pages
      const length = flatMenu.length
      const index = flatMenu.findIndex((i: MenuItem) => i.path === pathname)

      const prev =
        index !== 0
          ? {
              title: flatMenu[index - 1]?.label as string,
              path: flatMenu[index - 1]?.path as string,
            }
          : undefined

      const next =
        index !== length - 1
          ? {
              title: flatMenu[index + 1]?.label as string,
              path: flatMenu[index + 1]?.path as string,
            }
          : undefined

      setNavButtons({ prev, next })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className="post-pagination flex justify-between">
      {navButtons.prev?.path ? (
        <Link href={navButtons.prev.path} className="pagination prev">
          <span className="pagination-label">Previous</span>
          {pageTitle && (
            <span className="pagination-title">{navButtons.prev.title}</span>
          )}
        </Link>
      ) : (
        <div />
      )}
      {navButtons.next?.path ? (
        <Link href={navButtons.next.path} className="pagination next">
          <span className="pagination-label">Next</span>
          {pageTitle && (
            <span className="pagination-title">{navButtons.next.title}</span>
          )}
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
