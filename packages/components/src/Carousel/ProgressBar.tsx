import React from 'react'
import { Div } from 'maker-ui'
import { animated as a, useSpring } from 'react-spring'

const AnimatedBox = a(Div)

interface ProgressBarProps {
  duration?: number
  variant?: string | string[]
  reverse?: boolean
}

/**
 * The `ProgressBar` component is used to visually show a slide's
 * display duration in the `Carousel` component..
 *
 * @internal use only
 */

export const ProgressBar = ({
  duration,
  variant,
  reverse,
}: ProgressBarProps) => {
  const props = useSpring({
    from: {
      opacity: reverse ? 0 : 1,
      transform: `translateX(${reverse ? 100 : 0}%)`,
    },
    to: {
      opacity: reverse ? 1 : 0,
      transform: `translateX(${reverse ? 0 : 100}%)`,
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
      <AnimatedBox
        variant={`${variant}.progress.bar`}
        className="carousel-progress-bar"
        // @ts-ignore
        style={props}
        sx={{ height: '3px', bg: '#000' }}
      />
    </Div>
  )
}
