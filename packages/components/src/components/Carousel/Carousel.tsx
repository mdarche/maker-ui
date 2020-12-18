import * as React from 'react'
import { Div, MakerProps, useMeasure } from 'maker-ui'
import { animated, useSprings, SpringConfig } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import merge from 'deepmerge'

import { clamp } from '../helper'

import { Navigation } from './Navigation'
import { Pagination } from './Pagination'
import { ProgressBar } from './ProgressBar'

export interface CarouselProps extends MakerProps {
  data: Object[] | string[] // component props or an array of URL strings
  template: React.ReactElement
  spinner?: React.ReactElement
  settings?: {
    autoPlay?: boolean
    showNav?: boolean
    pageIndicator?: boolean
    infiniteScroll?: boolean
    progressBar?: boolean
    barReverse?: boolean
    hideControls?: boolean | number // number is the timeout
    showControlsOnHover?: boolean
    duration?: number
    arrow?:
      | React.ReactElement
      | { left?: React.ReactElement; right?: React.ReactElement }
    transition?: 'fade' | 'slide' | 'scale'
    springConfig?: SpringConfig
  }
}

/**
 * Use the `Carousel` component to iterate over an array of data objects or React components
 * to show an animated carousel.
 *
 * @todo - revisit accessible controls: https://www.w3.org/WAI/tutorials/carousels/full-code/
 * @todo - Add lazy image loading and Youtube/Vimeo video caching
 *
 * @see https://maker-ui.com/docs/components/carousel
 */

export const Carousel = ({
  data = [],
  template,
  settings = {},
  variant = 'carousel',
  sx,
  ...rest
}: CarouselProps) => {
  const index = React.useRef(0)
  const carouselRef = React.useRef(null)
  const [active, setActive] = React.useState(0)
  const [isPaused, setPause] = React.useState(false)
  const [, { width }] = useMeasure({ externalRef: carouselRef })

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const {
    infiniteScroll,
    autoPlay,
    duration,
    showNav,
    arrow,
    progressBar,
    pageIndicator,
  } = mergeSettings(settings)

  /**
   * React-spring slide animation
   */
  const [props, set] = useSprings(
    data.length,
    i => ({
      x: i * (width === 0 ? window.innerWidth : width),
      scale: 1,
      config: settings?.springConfig,
    }),
    [width]
  )

  /**
   * Handle drag and swipe gestures
   */
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (down && distance > width / 2) {
        cancel(
          // @ts-ignore
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            data.length - 1
          ))
        )
      }

      if (index.current > data.length - 1) {
        setActive(index.current % data.length)
      } else if (index.current < 0) {
        setActive(data.length + (index.current % data.length))
      } else {
        setActive(index.current)
      }

      set(i => {
        if (i < index.current - 1 || i > index.current + 1) {
          return { display: 'none' }
        }

        const x = (i - index.current) * width + (down ? mx : 0)
        const scale = down ? 1 - distance / width / 2 : 1
        return { x, scale }
      })
    }
  )

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = React.useCallback(
    (type: 'next' | 'previous') => {
      const isFirst = index.current === 0 ? true : false
      const isLast = index.current === data.length - 1 ? true : false
      const nextIndex = type === 'next' ? index.current + 1 : index.current - 1

      function update() {
        set(i => ({
          x: (i - index.current) * width,
          scale: 1,
        }))
      }

      /**
       * Handle infiniteScroll if user navigates beyond the array bounds
       */
      if (infiniteScroll) {
        if (type === 'next' && isLast) {
          index.current = 0
          setActive(0)
          return update()
        }

        if (type === 'previous' && isFirst) {
          index.current = data.length - 1
          setActive(data.length - 1)
          return update()
        }
      } else {
        /**
         * Simulate a bouncing / deflection gesture
         */
        if ((type === 'next' && isLast) || (type === 'previous' && isFirst)) {
          set(i => ({
            x: (i - index.current) * width - (type === 'next' ? 100 : -100),
          }))
          setTimeout(() => update(), 200)
          return
        }
      }

      index.current = nextIndex
      setActive(nextIndex)
      update()
    },
    [data.length, set, infiniteScroll, width]
  )

  /**
   * Pause the autoPlay slide transition
   */
  React.useEffect(() => {
    if (autoPlay && !isPaused) {
      const auto = setTimeout(() => {
        navigate('next')
      }, duration)

      return () => clearTimeout(auto)
    }
  }, [isPaused, navigate, active, autoPlay, duration])

  /**
   * Pause the autoPlay slide transition
   */
  const pause = React.useCallback(() => setPause(true), [])

  /**
   * Resume the autoPlay slide transition and reset counter
   */
  const resume = React.useCallback(() => setPause(false), [])

  /**
   * Handle pause on focus
   */
  React.useEffect(() => {
    const ref = carouselRef.current

    if (autoPlay) {
      ref?.addEventListener(`focusin`, pause)
      ref?.addEventListener(`focusout`, resume)
    }

    return () => {
      ref?.removeEventListener(`focusin`, pause)
      ref?.removeEventListener(`focusout`, resume)
    }
  }, [pause, resume, autoPlay])

  return (
    <Div
      ref={carouselRef}
      variant={variant}
      onMouseEnter={autoPlay ? pause : undefined}
      onMouseLeave={autoPlay ? resume : undefined}
      className="carousel"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '.slide': {
          position: 'absolute',
          display: 'block',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          willChange: 'transform',
        },
        '.slide-inner': {
          height: '100%',
          width: '100%',
          willChange: 'transform',
        },
        button: {
          zIndex: 100,
        },
        ...sx,
      }}
      {...rest}>
      {props.map(({ x, scale }, i) => (
        <animated.div
          className={`slide${index.current === i ? ' active' : ''}`}
          {...bind()}
          key={i}
          // @ts-ignore
          style={{ x }}>
          <animated.div
            className="slide-inner"
            style={{ scale: settings?.transition === 'scale' && scale }}>
            {React.cloneElement(template, data[i])}
          </animated.div>
        </animated.div>
      ))}

      {showNav ? (
        <Navigation variant={variant} navigate={navigate} arrow={arrow} />
      ) : null}
      {pageIndicator ? (
        <Pagination variant={variant} current={active} count={data.length} />
      ) : null}
      {progressBar && autoPlay ? (
        <ProgressBar variant={variant} settings={settings} />
      ) : null}
    </Div>
  )
}

Carousel.displayName = 'Carousel'

/**
 * Utility that merges user settings with `Carousel` defaults.
 */

function mergeSettings(settings: CarouselProps['settings']) {
  return merge(
    {
      autoPlay: true,
      showNav: true,
      pageIndicator: true,
      infiniteScroll: false,
      progressBar: false,
      barReverse: false,
      hideControls: false,
      showControlsOnHover: false,
      duration: 6500,
      transition: 'slide',
      springConfig: { mass: 1, tension: 160, friction: 28 },
    },
    settings
  )
}
