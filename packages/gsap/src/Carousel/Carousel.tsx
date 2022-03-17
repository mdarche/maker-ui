import React, { useState, useEffect, useRef } from 'react'
import { mergeSelectors, useMeasure, merge } from '@maker-ui/utils'
import { Div, type DivProps } from '@maker-ui/primitives'
import type { ResponsiveScale } from '@maker-ui/css'
import { ResizeObserver } from '@juggle/resize-observer'
import { gsap } from 'gsap'
import { useDrag } from '@use-gesture/react'

import { clamp, mergeRefs } from './helper'
import { NavArrows } from './NavArrows'
import { Pagination } from './Pagination'
import type { CarouselSettings, ArrowSettings, DotSettings } from './types'

export interface CarouselProps extends DivProps {
  data: Object[]
  template: React.ReactElement
  height?: ResponsiveScale
  arrows?: ArrowSettings | false
  dots?: DotSettings | false
  settings?: CarouselSettings
  loader?: React.ReactElement
  /** External controls via useState hook */
  controls?: [number, React.Dispatch<React.SetStateAction<number>>]
}

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
  dots = {},
  arrows = {},
  height = 500,
  controls,
  id,
  className,
  css,
  ...props
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(0)
  const [isPaused, setPause] = useState(false)
  const [measuredRef, { width }] = useMeasure({ polyfill: ResizeObserver })

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const {
    infiniteScroll,
    autoPlay,
    delay,
    duration,
    transition,
    draggable,
    fadeDuration,
  } = mergeSettings(settings)
  const _dots = mergeDots(dots)
  const _arrows = mergeArrows(arrows)

  let _active = controls ? controls[0] : active
  let _setActive = (val: number) =>
    controls ? controls[1](val) : setActive(val)

  // GSAP Static vars
  const numSlides = data.length
  const progressWrap = gsap.utils.wrap(0, 1)
  // var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100)
  // var timer = gsap.delayedCall(duration, autoPlay)

  // function autoPlayer() {
  //   setAutoPlayCount(autoPlayCount + 1)
  //   if (autoPlayCount < autoPlayLimit) {
  //     animateSlides(-1)
  //   }
  // }

  // function updateProgress() {
  //   animation.progress(progressWrap(gsap.getProperty(proxy, 'x') / wrapWidth))
  // }
  // function animateSlides(direction) {
  //   timer.restart(true)
  //   // slideAnimation.kill();

  //   var x = snapX(gsap.getProperty(proxy, 'x') + direction * slideWidth)

  //   gsap.to(proxy, {
  //     x: x,
  //     duration,
  //     onUpdate: updateProgress,
  //   })
  // }

  /** Initialize the slider and slide positions */
  useEffect(() => {}, [])

  // Handle Animation
  useEffect(() => {}, [index, width])

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = React.useCallback(
    (type: 'next' | 'previous' | 'index', idx?: number) => {
      const isFirst = index === 0 ? true : false
      const isLast = index === data.length - 1 ? true : false
      const nextIndex = type === 'next' ? index + 1 : index - 1

      function update() {
        // Animate here
      }

      /**
       * Handle page indicator buttons that select a specific slide index
       */
      if (type === 'index' && idx !== undefined) {
        setIndex(idx)
        _setActive(idx)
        update()
        return
      }

      /**
       * Handle infiniteScroll if user navigates beyond the array bounds
       */

      if (type === 'next' && isLast) {
        setIndex(0)
        _setActive(0)
        return update()
      } else if (type === 'previous' && isFirst) {
        setIndex(data.length - 1)
        _setActive(data.length - 1)
        return update()
      } else {
        setIndex(nextIndex)
        _setActive(nextIndex)
        return update()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.length, infiniteScroll, width]
  )

  /**
   * Handle external navigation from `controls prop`
   */
  useEffect(() => {
    if (controls && controls[0] !== index) {
      navigate('index', controls[0])
    }
  }, [navigate, controls, index])

  return (
    <Div
      id={id}
      ref={mergeRefs([carouselRef, measuredRef])}
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
      {...props}>
      <div className="slide-container">
        {data.map((d, i) => (
          <Div
            className={mergeSelectors([
              'slide',
              _active === i ? ' active' : '',
            ])}
            // {...bind()}
            key={i}
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
            <Div
              className="slide-inner"
              css={{
                height: '100%',
                width: '100%',
                willChange: 'transform',
              }}>
              {React.cloneElement(template, d)}
            </Div>
          </Div>
        ))}
      </div>
      {_arrows ? <NavArrows navigate={navigate} settings={_arrows} /> : null}
      {_dots ? (
        <Pagination
          navigate={navigate}
          current={_active}
          count={data.length}
          settings={_dots}
        />
      ) : null}
    </Div>
  )
}

Carousel.displayName = 'Carousel'

/**
 * Utility that merges user carousel ettings with the default settings.
 */
function mergeSettings(initial: CarouselProps['settings']) {
  return merge(
    {
      autoPlay: false,
      draggable: false,
      infiniteScroll: false,
      hideControls: false,
      showControlsOnHover: false,
      delay: 6500,
      duration: 300,
      transition: 'slide',
      fadeDuration: 0.5,
    },
    initial as object
  )
}

/**
 * Utility that merges user dot settings with the default settings.
 */
function mergeDots(initial: CarouselProps['dots']): DotSettings | false {
  if (!initial) return false
  return merge(
    {
      position: 'bottom',
      padding: 30,
      spacing: 10,
      colorActive: 'red',
      colorMuted: 'rgba(0, 0, 0, 0.25)',
    },
    initial
  )
}

/**
 * Utility that merges user arrow settings with the default settings.
 */
function mergeArrows(initial: CarouselProps['arrows']): ArrowSettings | false {
  if (!initial) return false
  return merge(
    {
      custom: undefined,
      padding: 20,
      margin: 0,
    },
    initial
  )
}
