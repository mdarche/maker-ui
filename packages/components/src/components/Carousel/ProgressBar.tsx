import * as React from 'react'
import { Div } from 'maker-ui'
import { animated, useSpring } from 'react-spring'

import { CarouselProps } from './Carousel'

const AnimatedDiv = animated(Div)

interface ProgressBarProps {
  current: number
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
  current,
  settings: { barReverse, duration },
}: ProgressBarProps) => {
  // console.log('current is', current)
  const [style] = useSpring(
    {
      from: {
        opacity: barReverse ? 0 : 1,
        x: barReverse ? '100%' : '20%',
      },
      to: {
        opacity: barReverse ? 1 : 0,
        x: barReverse ? '20%' : '100%',
      },
      config: { duration },
      reset: true,
    },
    []
  )

  return (
    <div
      // variant={`${variant}.progress`}
      className="carousel-progress"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        zIndex: 100,
      }}>
      <AnimatedDiv
        variant={`${variant}.progressBar`}
        className="carousel-progress-bar"
        // @ts-ignore
        style={style as any}
        sx={{ height: '3px', bg: '#000', zIndex: 100 }}
      />
    </div>
  )
}

ProgressBar.displayName = 'CarouselProgress'
