import React from 'react'
import { cn } from '@maker-ui/utils'
import type { CarouselClasses } from '@/types'

export interface PaginationProps {
  isDefault?: boolean
  length: number
  current: number
  classNames?: CarouselClasses | null
  factory: (
    selected: boolean,
    attrs: object,
    index: number
  ) => React.ReactElement
  onClick: (i: number) => void
}

export const Pagination = ({
  isDefault,
  length,
  current,
  factory,
  onClick,
  classNames,
}: PaginationProps) => {
  return (
    <div className={cn(['mkui-carousel-nav', classNames?.navigation])}>
      {[...Array(length)].map((_: any, i) => {
        const attrs: object = {
          role: 'tab',
          className: cn([
            'mkui-carousel-page',
            isDefault ? 'default' : '',
            classNames?.page,
            i === current ? 'active' : '',
          ]),
          onClick: () => onClick(i),
          'aria-label': `page ${i + 1}`,
          'aria-selected': i === current ? 'true' : 'false',
        }
        return (
          <React.Fragment key={i}>
            {factory(i === current, attrs, i)}
          </React.Fragment>
        )
      })}
    </div>
  )
}
