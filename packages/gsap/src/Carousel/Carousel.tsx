import * as React from 'react'
import { mergeSelectors, useMeasure, merge } from '@maker-ui/utils'
import { Div, type DivProps } from '@maker-ui/primitives'
import type { ResponsiveScale } from '@maker-ui/css'
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
  dots,
  arrows,
  height = 500,
  controls,
  id,
  className,
  css,
  ...props
}: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const index = React.useRef(0)
  const [active, setActive] = React.useState(0)
  const [isPaused, setPause] = React.useState(false)
  const [ref, { width }] = useMeasure()
  const slideRefs = React.useRef([])
  slideRefs.current = []

  // For GSAP
  const progressWrap = gsap.utils.wrap(0, 1)
  const numSlides = data.length
  const autoPlayLimit = numSlides * 2
  var autoPlayCount = 0

  let _active = controls ? controls[0] : active
  let _setActive = (val: number) =>
    controls ? controls[1](val) : setActive(val)

  const addToRefs = (el: any) => {
    //@ts-ignore
    if (el && !refs.current.includes(el)) {
      //@ts-ignore
      refs.current.push(el)
    }
  }

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const {
    infiniteScroll,
    autoPlay,
    duration,
    transition,
    draggable,
    fadeDuration,
  } = mergeSettings(settings)
  const _dots = mergeDots(dots)
  const _arrows = mergeArrows(arrows)

  React.useEffect(() => {
    gsap.set(slideRefs.current, {
      xPercent: (i) => i * 100,
    })

    var proxy = document.createElement('div')
    var slideAnimation = gsap.to({}, {})
    var slideWidth = 0
    var wrapWidth = 0
    // @ts-ignore
    var snapX
    resize()

    var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100)
    var timer = gsap.delayedCall(duration, autoPlay)

    const animation = gsap.to(slideRefs.current, {
      xPercent: '+=' + numSlides * 100,
      duration: 1,
      ease: 'none',
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: wrap,
      },
    })

    function updateProgress() {
      // @ts-ignore
      animation.progress(progressWrap(gsap.getProperty(proxy, 'x') / wrapWidth))
    }

    function animateSlides(direction: -1 | 1 | 0) {
      timer.restart(true)
      slideAnimation.kill()
      // @ts-ignore
      var x = snapX(gsap.getProperty(proxy, 'x') + direction * slideWidth)

      slideAnimation = gsap.to(proxy, {
        x: x,
        duration,
        onUpdate: updateProgress,
      })
    }

    function autoPlay() {
      // if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
      //   timer.restart(true);
      // } else {
      autoPlayCount++
      if (autoPlayCount < autoPlayLimit) {
        animateSlides(-1)
      }
      // }
    }

    function resize() {
      // @ts-ignore
      var norm = gsap.getProperty(proxy, 'x') / wrapWidth || 0
      // @ts-ignore
      slideWidth = slideRefs[0].offsetWidth
      wrapWidth = slideWidth * numSlides
      snapX = gsap.utils.snap(slideWidth)

      gsap.set(proxy, {
        x: norm * wrapWidth,
      })

      animateSlides(0)
      slideAnimation.progress(1)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

        // api.start((i) => {
        //   if (i < index.current - 1 || i > index.current + 1) {
        //     return { display: 'none' }
        //   }

        //   const x = (i - index.current) * width + (down ? mx : 0)
        //   const scale = down ? 1 - d / width / 2 : 1
        //   return { x, scale }
        // })
      }
    }
  )

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = React.useCallback(
    (type: 'next' | 'previous' | 'index', idx?: number) => {
      const isFirst = index.current === 0 ? true : false
      const isLast = index.current === data.length - 1 ? true : false
      const nextIndex = type === 'next' ? index.current + 1 : index.current - 1

      function update() {
        // api.start((i) => ({
        //   x: (i - index.current) * width,
        //   scale: 1,
        // }))
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
        // if ((type === 'next' && isLast) || (type === 'previous' && isFirst)) {
        //   api.start((i) => ({
        //     x: (i - index.current) * width - (type === 'next' ? 100 : -100),
        //   }))
        //   setTimeout(() => update(), 200)
        //   return
        // }
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
  React.useEffect(() => {
    if (controls && controls[0] !== index.current) {
      navigate('index', controls[0])
    }
  }, [navigate, controls, index])

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
  }, [isPaused, navigate, active, autoPlay, duration, controls])

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
   * @todo - test this
   */
  React.useEffect(() => {
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
      id={id}
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
      {...props}>
      <div className="slide-container">
        {data.map((d, i) => (
          <Div
            ref={addToRefs}
            className={mergeSelectors([
              'slide',
              _active === i ? ' active' : '',
            ])}
            {...bind()}
            key={i}
            // style={{
            //   opacity: transition === 'fade' && _active === i ? 1 : undefined,
            //   x: transition !== 'fade' ? x : undefined,
            // }}
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
              // style={{
              //   scale: transition === 'scale' ? scale : undefined,
              // }}
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
      duration: 6500,
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
