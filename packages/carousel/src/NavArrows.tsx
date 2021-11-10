import * as React from 'react'
import { Button, ResponsiveScale, SVG } from 'maker-ui'

interface NavArrowProps {
  arrow?: any
  arrowPadding?: ResponsiveScale
  arrowMargin?: ResponsiveScale
  navigate?(type: 'next' | 'previous' | 'index', index?: number): void
}

interface NavButtonProps extends NavArrowProps {
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
  arrow,
  arrowPadding,
  arrowMargin,
  onClick,
}: NavButtonProps) => (
  <Button
    title={`${isNext ? 'Next' : 'Previous'} Slide`}
    aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
    className={`carousel-nav ${isNext ? 'carousel-next' : 'carousel-prev'}`}
    onClick={onClick}
    style={{ ...transform(isNext, arrow), ...position(isNext) }}
    css={{
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      position: 'absolute',
      top: '50%',
      padding: arrowPadding,
      margin: arrowMargin,
      zIndex: 1,
    }}>
    {arrow ? (
      React.isValidElement(arrow) ? (
        arrow
      ) : (
        arrow[isNext ? 'next' : 'prev']
      )
    ) : (
      <ArrowIcon />
    )}
  </Button>
)

const ArrowIcon = () => (
  <SVG css={{ height: 30 }} viewBox="0 0 39 70">
    <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
  </SVG>
)

/**
 * The `Navigation` component adds previous / next buttons to the `Carousel` component.
 *
 * @internal usage only
 */

export const NavArrows = React.memo(({ navigate, ...props }: NavArrowProps) => {
  return (
    <div className="carousel-navigation">
      <NavButton onClick={() => navigate && navigate('previous')} {...props} />
      <NavButton
        onClick={() => navigate && navigate('next')}
        isNext
        {...props}
      />
    </div>
  )
})

NavArrows.displayName = 'Arrows'

/**
 * Returns a left or right position style rule
 */
const position = (isNext: boolean) => (isNext ? { right: 0 } : { left: 0 })

/**
 * Returns a center transform and reflected arrow for the left previous button.
 */
const transform = (isNext: boolean, arrow: NavArrowProps['arrow']) => {
  return arrow?.prev
    ? null
    : isNext
    ? { transform: 'translateY(-50%)' }
    : { transform: 'translateY(-50%) scaleX(-1)' }
}
