import * as React from 'react'
import { merge, cn } from '@maker-ui/utils'
import type { Position, DotSettings } from '@/types'

interface PaginationProps {
  current: number
  count: number
  settings: DotSettings
  navigate?(type: 'next' | 'previous' | 'index', index?: number): void
}

/**
 * The `Pagination` component adds page indicators to the `Carousel` component.
 *
 * @internal
 */
export const Pagination = ({
  navigate,
  current,
  count,
  settings: {
    position,
    padding,
    spacing,
    height,
    width,
    borderRadius,
    colorActive,
    colorMuted,
    css,
  },
}: PaginationProps) => {
  let indicators = []

  const getSpacing = (index: number) => {
    if (index <= count - 2) {
      return {
        marginRight:
          position === 'top' || position === 'bottom' ? spacing : undefined,
        marginBottom:
          position === 'left' || position === 'right' ? spacing : undefined,
      }
    }

    return undefined
  }

  for (let i = 0; i <= count - 1; i++) {
    indicators.push(
      <button
        key={i}
        role="tab"
        className={cn(['carousel-dot', `${current === i ? 'active' : ''}`])}
        onClick={() => navigate && navigate('index', i)}
        aria-label={`Show slide ${i + 1}`}
        aria-selected={i === current ? 'true' : 'false'}
        // css={merge(
        //   {
        //     ...getSpacing(i),
        //     padding: 0,
        //     height,
        //     width,
        //     borderRadius,
        //     border: 'none',
        //     backgroundColor: colorMuted,
        //     '&.active': {
        //       backgroundColor: colorActive,
        //     },
        //   },
        //   (css as object) || {}
        // )}
      />
    )
  }

  return (
    <div
      className="carousel-pagination flex"
      role="tablist"
      // css={{
      //   position: 'absolute',
      //   top: position === 'top' ? padding : undefined,
      //   bottom: position === 'bottom' ? padding : undefined,
      //   left: position === 'left' ? padding : undefined,
      //   right: position === 'right' ? padding : undefined,
      //   ...getPosition(position as Position, padding as number),
      //   flexDirection:
      //     position === 'top' || position === 'bottom' ? 'row' : 'column',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   zIndex: 1,
      // }}
    >
      {indicators}
    </div>
  )
}
