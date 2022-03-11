import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  cloneElement,
} from 'react'
import { mergeSelectors, useMeasure, merge } from '@maker-ui/utils'
import { Div } from '@maker-ui/primitives'
import type { MakerProps, ResponsiveScale } from '@maker-ui/css'
import { animated, useSprings, type SpringConfig } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { clamp, mergeRefs } from './helper'

import { NavArrows } from './NavArrows'
import { Pagination, Position } from './Pagination'

export interface CarouselProps extends MakerProps {
  data: Object[]
  template: React.ReactElement
  height?: ResponsiveScale
  className?: string
  settings?: {
    autoPlay?: boolean
    arrows?: boolean
    arrowPadding?: ResponsiveScale
    arrowMargin?: ResponsiveScale
    dots?: boolean
    dotPosition?: Position
    dotPadding?: ResponsiveScale
    dotSpacing?: ResponsiveScale
    dotColorActive?: string
    dotColorMuted?: string
    draggable?: boolean
    infiniteScroll?: boolean
    duration?: number // milliseconds
    spinner?: React.ReactElement
    arrow?:
      | React.ReactElement
      | { prev?: React.ReactElement; next?: React.ReactElement }
    transition?: 'fade' | 'slide' | 'scale'
    fadeDuration?: number // seconds
    springConfig?: SpringConfig
  }
  controls?: [number, React.Dispatch<React.SetStateAction<number>>]
}

const AnimatedDiv = animated(Div)

/**
 * Use the `Carousel` component to iterate over an array of data objects or React components
 * to show an animated carousel.
 *
 * @link https://maker-ui.com/docs/elements/carousel
 */
export const Carousel = ({
  data = [],
  template,
  settings = {},
  height = 500,
  controls,
  className,
  css,
  ...rest
}: CarouselProps) => {
  const carouselRef = useRef<any>(null)
  const index = useRef(0)
  const [active, setActive] = useState(0)
  const [isPaused, setPause] = useState(false)
  const [ref, { width }] = useMeasure()

  const _active = controls ? controls[0] : active
  const _setActive = (val: number) =>
    controls ? controls[1](val) : setActive(val)

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const {
    infiniteScroll,
    autoPlay,
    duration,
    arrows,
    arrow,
    arrowPadding,
    arrowMargin,
    dots,
    dotPosition,
    dotPadding,
    dotSpacing,
    dotColorMuted,
    dotColorActive,
    transition,
    draggable,
    fadeDuration,
    springConfig,
  } = mergeSettings(settings)

  /**
   * React-spring slide animation
   */

  const [props, api] = useSprings(
    data.length,
    (i) => ({
      // x: i * (width === 0 && isBrowser ? window.innerWidth : width),
      x: i * width,
      scale: 1,
      config: springConfig,
    }),
    [width]
  )

  /**
   * Handle drag and swipe gestures
   */
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance: [d], cancel }) => {
      if (draggable) {
        if (down && d > width / 3.5) {
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
          _setActive(index.current % data.length)
        } else if (index.current < 0) {
          _setActive(data.length + (index.current % data.length))
        } else {
          _setActive(index.current)
        }

        api.start((i) => {
          if (i < index.current - 1 || i > index.current + 1) {
            return { display: 'none' }
          }

          const x = (i - index.current) * width + (down ? mx : 0)
          const scale = down ? 1 - d / width / 2 : 1
          return { x, scale }
        })
      }
    }
  )

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = useCallback(
    (type: 'next' | 'previous' | 'index', idx?: number) => {
      const isFirst = index.current === 0 ? true : false
      const isLast = index.current === data.length - 1 ? true : false
      const nextIndex = type === 'next' ? index.current + 1 : index.current - 1

      function update() {
        api.start((i) => ({
          x: (i - index.current) * width,
          scale: 1,
        }))
      }

      /**
       * Handle page indicator buttons that select a specific slide index
       */
      if (type === 'index' && idx !== undefined) {
        index.current = idx
        _setActive(idx)
        update()
        return
      }

      /**
       * Handle infiniteScroll if user navigates beyond the array bounds
       */
      if (infiniteScroll) {
        if (type === 'next' && isLast) {
          index.current = 0
          _setActive(0)
          return update()
        }

        if (type === 'previous' && isFirst) {
          index.current = data.length - 1
          _setActive(data.length - 1)
          return update()
        }
      } else {
        /**
         * Simulate a bouncing / deflection drag gesture
         */
        if ((type === 'next' && isLast) || (type === 'previous' && isFirst)) {
          api.start((i) => ({
            x: (i - index.current) * width - (type === 'next' ? 100 : -100),
          }))
          setTimeout(() => update(), 200)
          return
        }
      }

      index.current = nextIndex
      _setActive(nextIndex)
      update()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.length, infiniteScroll, width]
  )

  /**
   * Handle external navigation from `controls prop`
   */
  useEffect(() => {
    if (controls && controls[0] !== index.current) {
      navigate('index', controls[0])
    }
  }, [navigate, controls, index])

  /**
   * Pause the autoPlay slide transition
   */
  useEffect(() => {
    if (autoPlay && !isPaused) {
      const auto = setTimeout(() => {
        navigate('next')
      }, duration)

      return () => clearTimeout(auto)
    }
  }, [isPaused, navigate, active, autoPlay, duration, controls])

  /**
   * Pause the autoPlay slide transition
   */
  const pause = useCallback(() => setPause(true), [])

  /**
   * Resume the autoPlay slide transition and reset counter
   */
  const resume = useCallback(() => setPause(false), [])

  /**
   * Handle pause on focus
   * @todo - test this
   */
  useEffect(() => {
    const current = carouselRef.current

    if (autoPlay) {
      current?.addEventListener(`focusin`, pause)
      current?.addEventListener(`focusout`, resume)
    }

    return () => {
      current?.removeEventListener(`focusin`, pause)
      current?.removeEventListener(`focusout`, resume)
    }
  }, [pause, resume, autoPlay])

  return (
    <Div
      ref={mergeRefs([carouselRef, ref])}
      onMouseEnter={autoPlay ? pause : undefined}
      onMouseLeave={autoPlay ? resume : undefined}
      className={mergeSelectors(['carousel', className])}
      css={{
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        zIndex: 0,
        height,
        ...(css as object),
        button: {
          zIndex: 100,
        },
      }}
      {...rest}>
      <Div className="slide-container">
        {props.map(({ x, scale }, i) => (
          <AnimatedDiv
            className={`slide${_active === i ? ' active' : ''}`}
            {...bind()}
            key={i}
            style={{
              opacity: transition === 'fade' && _active === i ? 1 : undefined,
              x: transition !== 'fade' ? x : undefined,
            }}
            css={{
              position: 'absolute',
              display: 'block',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              willChange: 'transform',
              opacity: transition === 'fade' ? 0 : undefined,
              zIndex: i === 0 ? 1 : 0,
              transition:
                transition === 'fade'
                  ? `opacity ${fadeDuration}s ease-in-out`
                  : undefined,
            }}>
            <AnimatedDiv
              className="slide-inner"
              style={{
                scale: transition === 'scale' ? scale : undefined,
              }}
              css={{
                height: '100%',
                width: '100%',
                willChange: 'transform',
              }}>
              {cloneElement(template, data[i])}
            </AnimatedDiv>
          </AnimatedDiv>
        ))}
      </Div>

      {arrows ? (
        <NavArrows
          navigate={navigate}
          arrow={arrow}
          arrowPadding={arrowPadding}
          arrowMargin={arrowMargin}
        />
      ) : null}
      {dots ? (
        <Pagination
          navigate={navigate}
          current={_active}
          count={data.length}
          settings={{
            dotPadding,
            dotSpacing,
            dotPosition: dotPosition as Position,
            mutedColor: dotColorMuted,
            activeColor: dotColorActive,
          }}
        />
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
      autoPlay: false,
      arrows: true,
      arrowPadding: 20,
      arrowMargin: 0,
      dots: true,
      dotPosition: 'bottom',
      dotPadding: 30,
      dotSpacing: 10,
      dotColorMuted: 'rgba(0, 0, 0, 0.25)',
      dotColorActive: 'red',
      draggable: false,
      infiniteScroll: false,
      hideControls: false,
      arrow: undefined,
      showControlsOnHover: false,
      duration: 6500,
      transition: 'slide',
      fadeDuration: 0.5,
      springConfig: { mass: 1, tension: 160, friction: 28 },
    },
    settings as object
  )
}
