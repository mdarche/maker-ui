import * as React from 'react'
import { Flex, Button } from 'maker-ui'

import { CarouselProps } from './Carousel'

interface PaginationProps {
  current: number
  count: number
  variant?: CarouselProps['variant']
}

/**
 * The `Pagination` component adds page indicators for the `Carousel` component.
 *
 * @internal usage only
 */

export const Pagination = ({ variant, current, count }: PaginationProps) => {
  let indicators = []

  for (let i = 0; i <= count - 1; i++) {
    indicators.push(
      <Button
        key={i}
        variant={`${variant}.page`}
        role="tab"
        aria-label={`Show slide ${i + 1}`}
        aria-selected={i === current ? 'true' : 'false'}
        className={`carousel-page ${current === i && 'active'}`}
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
      role="tablist"
      className="carousel-pagination"
      sx={{ position: 'absolute', alignItems: 'center', zIndex: 1 }}>
      {indicators}
    </Flex>
  )
}

Pagination.displayName = 'CarouselPagination'
