import * as React from 'react'
import { Flex, Button, ResponsiveScale, mergeSelectors } from 'maker-ui'

export type Position = 'top' | 'bottom' | 'right' | 'left'

export interface PaginationProps {
  current: number
  count: number
  settings: {
    dotPosition: Position
    dotPadding: ResponsiveScale
    dotSpacing: ResponsiveScale
    mutedColor: string
    activeColor: string
  }
  navigate?(type: 'next' | 'previous' | 'index', index?: number): void
}

/**
 * The `Pagination` component adds page indicators to the `Carousel` component.
 *
 * @internal usage only
 */

export const Pagination = ({
  navigate,
  current,
  count,
  settings,
}: PaginationProps) => {
  let indicators = []

  const {
    dotPosition,
    dotPadding,
    dotSpacing,
    mutedColor,
    activeColor,
  } = settings

  const getSpacing = (index: number) => {
    if (index <= count - 2) {
      return {
        marginRight:
          dotPosition === 'top' || dotPosition === 'bottom'
            ? dotSpacing
            : undefined,
        marginBottom:
          dotPosition === 'left' || dotPosition === 'right'
            ? dotSpacing
            : undefined,
      }
    }

    return undefined
  }

  for (let i = 0; i <= count - 1; i++) {
    indicators.push(
      <Button
        key={i}
        role="tab"
        className={mergeSelectors([
          'carousel-dot',
          `${current === i ? 'active' : ''}`,
        ])}
        onClick={() => navigate && navigate('index', i)}
        aria-label={`Show slide ${i + 1}`}
        aria-selected={i === current ? 'true' : 'false'}
        css={{
          ...getSpacing(i),
          padding: 0,
          height: 10,
          width: 10,
          border: 'none',
          borderRadius: '50%',
          backgroundColor: mutedColor,
          '&.active': {
            backgroundColor: activeColor,
          },
        }}
      />
    )
  }

  return (
    <Flex
      className="carousel-pagination"
      role="tablist"
      css={{
        position: 'absolute',
        top: dotPosition === 'top' ? dotPadding : undefined,
        bottom: dotPosition === 'bottom' ? dotPadding : undefined,
        left: dotPosition === 'left' ? dotPadding : undefined,
        right: dotPosition === 'right' ? dotPadding : undefined,
        ...getPosition(dotPosition, dotPadding),
        flexDirection:
          dotPosition === 'top' || dotPosition === 'bottom' ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}>
      {indicators}
    </Flex>
  )
}

Pagination.displayName = 'CarouselPagination'

function getPosition(pos: Position, gap: ResponsiveScale): object {
  if (pos === 'left' || pos === 'right') {
    return {
      top: '50%',
      transform: `translate3d(0,-50%,0)`,
      left: pos === 'left' ? gap : undefined,
      right: pos === 'right' ? gap : undefined,
    }
  }

  return {
    left: '50%',
    transform: `translate3d(-50%,0,0)`,
    top: pos === 'top' ? gap : undefined,
    bottom: pos === 'bottom' ? gap : undefined,
  }
}
