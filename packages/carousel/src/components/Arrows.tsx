import * as React from 'react'
import { ArrowSettings } from '@/types'
import { getArrowPosition, getArrowTransform } from '@/helpers'

interface NavArrowProps {
  settings: ArrowSettings
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
 * @internal
 */
const ArrowButton = ({
  isNext = false,
  settings: { custom, padding, margin, css },
  onClick,
}: NavButtonProps) => (
  <button
    title={`${isNext ? 'Next' : 'Previous'} Slide`}
    aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
    className={`carousel-nav ${isNext ? 'carousel-next' : 'carousel-prev'}`}
    onClick={onClick}
    style={{
      ...getArrowTransform(isNext, custom),
      ...getArrowPosition(isNext),
    }}
    // css={{
    //   cursor: 'pointer',
    //   background: 'none',
    //   border: 'none',
    //   position: 'absolute',
    //   top: '50%',
    //   padding,
    //   margin,
    //   zIndex: 1,
    //   ...(css as object),
    // }}
  >
    {custom ? (
      React.isValidElement(custom) ? (
        custom
      ) : (
        custom[isNext ? 'next' : 'prev']
      )
    ) : (
      <ArrowIcon />
    )}
  </button>
)

const ArrowIcon = () => (
  <svg style={{ height: 30 }} viewBox="0 0 39 70">
    <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
  </svg>
)

/**
 * The `Navigation` component adds previous / next buttons to the `Carousel` component.
 *
 * @internal
 */

export const NavArrows = React.memo(({ navigate, ...props }: NavArrowProps) => {
  return (
    <div className="carousel-navigation">
      <ArrowButton
        onClick={() => navigate && navigate('previous')}
        {...props}
      />
      <ArrowButton
        onClick={() => navigate && navigate('next')}
        isNext
        {...props}
      />
    </div>
  )
})

NavArrows.displayName = 'Arrows'
