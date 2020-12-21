import * as React from 'react'
import { Button } from 'maker-ui'

import { CarouselArrowIcon } from '../icons'
import { CarouselProps } from './Carousel'

const position = (isNext: boolean) => (isNext ? { right: 0 } : { left: 0 })
const transform = (isNext: boolean, arrow: NavigationProps['arrow']) => {
  // @ts-ignore
  return arrow?.prev
    ? null
    : isNext
    ? { transform: 'translateY(-50%)' }
    : { transform: 'translateY(-50%) rotate(180deg)' }
}

interface NavigationProps {
  arrow?: CarouselProps['settings']['arrow']
  variant?: CarouselProps['variant']
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

const NavButton = ({
  isNext = false,
  variant,
  arrow,
  onClick,
}: NavButtonProps) => (
  <Button
    title={`${isNext ? 'Next' : 'Previous'} Slide`}
    aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
    variant={isNext ? `${variant}.next` : `${variant}.prev`}
    className={`carousel-nav ${isNext ? 'carousel-next' : 'carousel-prev'}`}
    onClick={onClick}
    sx={{
      variant: `${variant}.nav`,
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
        <NavButton onClick={e => navigate('previous')} {...props} />
        <NavButton onClick={e => navigate('next')} isNext {...props} />
      </div>
    )
  }
)

Navigation.displayName = 'CarouselNavigation'