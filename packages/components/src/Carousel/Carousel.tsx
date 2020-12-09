import * as React from 'react'
import { Div, MakerProps } from 'maker-ui'
import { animated as a, SpringConfig } from 'react-spring'

import { Canvas } from './Canvas'
import Navigation from './Navigation'
import { Pagination } from './Pagination'
import { ProgressBar } from './ProgressBar'

export interface CarouselProps extends MakerProps {
  data: Object[]
  template: React.ReactElement
  nav?: boolean
  pageIndicator?: boolean
  progressBar?: boolean
  barReverse?: boolean
  autoPlay?: boolean
  hoverPause?: boolean
  hideControls?: boolean
  pause?: boolean
  arrow?: React.ReactElement
  transition?: 'fade' | 'slide' | 'slide-fade'
  duration?: number
  springConfig?: SpringConfig
}

function reducer(state, { type, value }) {
  switch (type) {
    case 'set': {
      return { ...state, index: value }
    }
    case 'next': {
      return {
        ...state,
        index: (state.index + 1) % state.count,
        nextSlide: true,
      }
    }
    case 'previous': {
      return {
        ...state,
        index: state.index === 0 ? state.count - 1 : state.index - 1,
        nextSlide: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

/**
 * Use the `Carousel` component to iterate over an array of data objects or React components
 * to show an animated carousel.
 *
 * @todo - add drag and swipe gesture
 * @todo - revisit accessible controls: https://www.w3.org/WAI/tutorials/carousels/full-code/
 * @todo - rebuild next() and prev() functions with useCallback hooks
 *
 * @see https://maker-ui.com/docs/components/carousel
 */

export const Carousel = React.forwardRef(
  (
    {
      data = [],
      template,
      nav = true,
      pageIndicator = false,
      progressBar = false,
      barReverse = false,
      autoPlay = false,
      hoverPause = false, // TODO
      hideControls = false, // TODO
      pause = false,
      arrow,
      transition,
      duration = 6500,
      variant = 'carousel',
      springConfig = { mass: 1, tension: 160, friction: 28 },
      sx,
      ...props
    }: CarouselProps,
    ref
  ) => {
    const [state, dispatch] = React.useReducer(reducer, {
      index: 0,
      count: data.length,
      nextSlide: false,
    })

    // @ts-ignore
    const next = () => dispatch({ type: 'next' })
    // @ts-ignore
    const prev = () => dispatch({ type: 'previous' })

    React.useEffect(() => {
      if (autoPlay && !pause) {
        const auto = setTimeout(() => {
          next()
        }, duration)

        return () => clearTimeout(auto)
      }
    }, [state, autoPlay, pause, next, duration])

    const slides = data.map(item => ({ style }, i) => (
      <a.div key={i} style={{ ...style }} className="slide">
        {React.cloneElement(template, item)}
      </a.div>
    ))

    return (
      <Div
        // @ts-ignore
        ref={ref}
        variant={variant}
        className="carousel"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          ...sx,
        }}
        {...props}>
        <Canvas
          currentIndex={state.index}
          slides={slides}
          transition={transition}
          next={state.nextSlide}
          config={springConfig}
        />
        {nav ? (
          <Navigation
            controls={{ prev, next }}
            arrow={arrow}
            variant={variant}
          />
        ) : null}
        {pageIndicator ? (
          <Pagination
            current={state.index}
            set={dispatch}
            count={state.count}
            variant={variant}
          />
        ) : null}
        {progressBar && autoPlay ? (
          <ProgressBar
            duration={duration}
            variant={variant}
            reverse={barReverse}
          />
        ) : null}
      </Div>
    )
  }
)

Carousel.displayName = 'Carousel'
