import React from 'react'
import { cn } from '@maker-ui/utils'
import type { SlideItem, CarouselClasses } from '@/types'

export interface NavigationProps {
  items: SlideItem[]
  current: number
  // Old Factory
  navigate: (selected: boolean) => React.ReactElement
  onClick: (i: number) => void
  classNames?: CarouselClasses | null
}

export const Navigation = ({
  items,
  current,
  onClick,
  navigate,
  classNames,
}: NavigationProps) => {
  return (
    <div className={cn(['mkui_carousel_nav', classNames?.navigation])}>
      {items.map((_: any, i: number) => (
        <div key={i} onMouseOver={() => onClick(i)}>
          {navigate(current === i)}
        </div>
      ))}
    </div>
  )
}
