import * as React from 'react'
import { Flex, Button } from 'maker-ui'

import { CarouselProps } from './Carousel'

interface PaginationProps {
  current: number
  count: number
  variant?: CarouselProps['variant']
  navigate?(type: 'next' | 'previous' | 'index', index?: number): void
}

/**
 * The `Pagination` component adds page indicators for the `Carousel` component.
 *
 * @internal usage only
 */

export const Pagination = ({
  variant,
  navigate,
  current,
  count,
}: PaginationProps) => {
  let indicators = []

  for (let i = 0; i <= count - 1; i++) {
    indicators.push(
      <Button
        key={i}
        variant={`${variant}.pageIndicator`}
        className={`carousel-page ${current === i && 'active'}`}
        role="tab"
        onClick={e => navigate('index', i)}
        aria-label={`Show slide ${i + 1}`}
        aria-selected={i === current ? 'true' : 'false'}
        sx={{
          mx: 1,
          p: 0,
          height: 10,
          width: 10,
          border: 'none',
          borderRadius: '50%',
          bg: 'rgba(0, 0, 0, 0.25)',
        }}
      />
    )
  }

  return (
    <Flex
      variant={`${variant}.pagination`}
      className="carousel-pagination"
      role="tablist"
      sx={{ position: 'absolute', alignItems: 'center', zIndex: 1 }}>
      {indicators}
    </Flex>
  )
}

Pagination.displayName = 'CarouselPagination'
