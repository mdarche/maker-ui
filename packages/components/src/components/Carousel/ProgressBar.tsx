import * as React from 'react'
import { Div } from 'maker-ui'
import { animated, useSpring } from 'react-spring'

import { CarouselProps } from './Carousel'

const AnimatedDiv = animated(Div)

interface ProgressBarProps {
  variant?: CarouselProps['variant']
  settings?: CarouselProps['settings']
}

/**
 * The `ProgressBar` component is used to visually show a slide's
 * display duration in the `Carousel` component..
 *
 * @internal usage only
 */

export const ProgressBar = ({
  variant,
  settings: { barReverse, duration },
}: ProgressBarProps) => {
  const props = useSpring({
    from: {
      opacity: barReverse ? 0 : 1,
      transform: `translateX(${barReverse ? 100 : 0}%)`,
    },
    to: {
      opacity: barReverse ? 1 : 0,
      transform: `translateX(${barReverse ? 0 : 100}%)`,
    },
    config: { duration },
    reset: true,
  })

  return (
    <Div
      variant={`${variant}.progress`}
      className="carousel-progress"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
      }}>
      <AnimatedDiv
        variant={`${variant}.progress.bar`}
        className="carousel-progress-bar"
        // TODO - remove w/ stable React-spring v9
        style={props as any}
        sx={{ height: '3px', bg: '#000' }}
      />
    </Div>
  )
}

ProgressBar.displayName = 'CarouselProgress'
