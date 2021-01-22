import * as React from 'react'
import { Flex, Button } from 'maker-ui'

interface PaginationProps {
  current: number
  count: number
  navigate?(type: 'next' | 'previous' | 'index', index?: number): void
}

/**
 * The `Pagination` component adds page indicators to the `Carousel` component.
 *
 * @internal usage only
 */

export const Pagination = ({ navigate, current, count }: PaginationProps) => {
  let indicators = []

  for (let i = 0; i <= count - 1; i++) {
    indicators.push(
      <Button
        key={i}
        className={`carousel-page ${current === i && 'active'}`}
        role="tab"
        onClick={e => navigate('index', i)}
        aria-label={`Show slide ${i + 1}`}
        aria-selected={i === current ? 'true' : 'false'}
        css={{
          margin: '0 5px',
          padding: 0,
          height: 10,
          width: 10,
          border: 'none',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      />
    )
  }

  return (
    <Flex
      className="carousel-pagination"
      role="tablist"
      css={{ position: 'absolute', alignItems: 'center', zIndex: 1 }}>
      {indicators}
    </Flex>
  )
}

Pagination.displayName = 'CarouselPagination'
