import * as React from 'react'
import { Button } from 'maker-ui'

import { CarouselArrowIcon } from '../icons'

const position = (isNext: boolean) => (isNext ? { right: 0 } : { left: 0 })
const transform = (isNext: boolean, arrow: NavigationProps['arrow']) => {
  return arrow?.prev
    ? null
    : isNext
    ? { transform: 'translateY(-50%)' }
    : { transform: 'translateY(-50%) rotate(180deg)' }
}

interface NavigationProps {
  arrow?: any
  navigate?(type: 'next' | 'previous' | 'index', index?: number): void
}

interface NavButtonProps extends NavigationProps {
  isNext?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * The `NavButton` component creates an accessible button component for
 * the Carousel `Navigation`.
 *
 * @internal usage only
 */

const NavButton = ({ isNext = false, arrow, onClick }: NavButtonProps) => (
  <Button
    title={`${isNext ? 'Next' : 'Previous'} Slide`}
    aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
    className={`carousel-nav ${isNext ? 'carousel-next' : 'carousel-prev'}`}
    onClick={onClick}
    css={{
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      position: 'absolute',
      top: '50%',
      zIndex: 1,
      ...transform(isNext, arrow),
      ...position(isNext),
    }}>
    {arrow ? (
      React.isValidElement(arrow) ? (
        arrow
      ) : (
        arrow[isNext ? 'next' : 'prev']
      )
    ) : (
      <CarouselArrowIcon />
    )}
  </Button>
)

/**
 * The `Navigation` component adds previous / next buttons to the `Carousel` component.
 *
 * @internal usage only
 */

export const Navigation = React.memo(
  ({ navigate, ...props }: NavigationProps) => {
    return (
      <div className="carousel-navigation">
        <NavButton
          onClick={() => navigate && navigate('previous')}
          {...props}
        />
        <NavButton
          onClick={() => navigate && navigate('next')}
          isNext
          {...props}
        />
      </div>
    )
  }
)

Navigation.displayName = 'CarouselNavigation'
