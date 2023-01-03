import React from 'react'
import { cn } from '@maker-ui/utils'
import type { CarouselClasses } from '@/types'

export interface PaginationProps {
  length: number
  current: number
  classNames?: CarouselClasses | null
  factory: (selected: boolean, attrs: object) => React.ReactElement
  onClick: (i: number) => void
}

export const Pagination = ({
  length,
  current,
  factory,
  onClick,
  classNames,
}: PaginationProps) => {
  return (
    <div className={cn(['mkui_carousel_nav', classNames?.navigation])}>
      {[...Array(length)].map((_: any, i) => {
        const attrs: object = {
          key: i,
          role: 'tab',
          className: cn([
            'mkui_carousel_page',
            classNames?.page,
            i === current ? 'active' : '',
          ]),
          onClick: () => onClick(i),
          'aria-label': `page ${i + 1}`,
          'aria-selected': i === current ? 'true' : 'false',
        }
        return factory(i === current, attrs)
      })}
    </div>
  )
}
