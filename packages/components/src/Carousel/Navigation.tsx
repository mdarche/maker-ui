import * as React from 'react'
import { Button } from 'maker-ui'

import { CarouselArrowIcon } from '../icons'

const position = isNext => (isNext ? { right: 0 } : { left: 0 })
const transform = isNext =>
  isNext
    ? { transform: 'translateY(-50%)' }
    : { transform: 'translateY(-50%) rotate(180deg)' }

interface NavigationProps {
  arrow?: string | React.ReactElement
  variant?: string | string[]
  controls: {
    prev: Function
    next: Function
  }
}

interface NavButtonProps {
  isNext?: boolean
  arrow?: string | React.ReactElement
  control: any
  variant?: string | string[]
}

/**
 * The `NavButton` component creates an accessible button component for
 * the Carousel `Navigation`.
 *
 * @internal usage only
 */

const NavButton = ({
  isNext = false,
  variant,
  control,
  arrow,
}: NavButtonProps) => (
  <Button
    title={`${isNext ? 'Next' : 'Previous'} Slide`}
    aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
    variant={isNext ? `${variant}.next` : `${variant}.prev`}
    className={`carousel-nav ${isNext ? 'carousel-next' : 'carousel-prev'}`}
    onClick={control}
    sx={{
      variant: `${variant}.nav`,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      position: 'absolute',
      top: '50%',
      zIndex: 1,
      ...transform(isNext),
      ...position(isNext),
    }}>
    {arrow || <CarouselArrowIcon />}
  </Button>
)

/**
 * The `Navigation` component adds previous / next buttons to the `Carousel` component.
 *
 * @internal usage only
 */

const Navigation = React.memo(({ controls, ...props }: NavigationProps) => {
  return (
    <div>
      <NavButton control={controls.prev} {...props} />
      <NavButton control={controls.next} isNext {...props} />
    </div>
  )
})

Navigation.displayName = 'CarouselNavigation'

export default Navigation
