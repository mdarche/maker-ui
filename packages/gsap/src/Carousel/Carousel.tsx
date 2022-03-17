import React, { useState, useRef, useCallback } from 'react'
import { mergeSelectors, useMeasure, merge } from '@maker-ui/utils'
import { Div, type DivProps } from '@maker-ui/primitives'
import type { ResponsiveScale } from '@maker-ui/css'
import { ResizeObserver } from '@juggle/resize-observer'
import { gsap } from 'gsap'
// import { useDrag } from '@use-gesture/react'

import { mergeRefs } from './helper'
import { NavArrows } from './NavArrows'
import { Pagination } from './Pagination'
import type { CarouselSettings, ArrowSettings, DotSettings } from './types'
import { useLoop } from './useLoop'

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
  // Merge user settings with defaults
  const { autoPlay, autoPlayLimit, delay, duration, transition, draggable } =
    mergeSettings(settings)
  // Local State
  const carouselRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [autoPlayCount, setAutoPlayCount] = useState(0)
  const [measuredRef, { width }] = useMeasure({ polyfill: ResizeObserver })
  const [timer] = useState(gsap.delayedCall(delay, initAutoPlay))
  const slideRefs = useRef([])
  slideRefs.current = []
  const loop = useLoop(slideRefs.current, width)

  function addToRefs(el: any) {
    //@ts-ignore
    if (el && !slideRefs.current.includes(el)) {
      //@ts-ignore
      slideRefs.current.push(el)
    }
  }

  function initAutoPlay() {
    console.log('Hitting this')
    if (autoPlay) {
      setAutoPlayCount(autoPlayCount + 1)
      if (autoPlayCount < autoPlayLimit * data.length) {
        navigate('next')
      }
    }
  }

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const _dots = mergeDots(dots)
  const _arrows = mergeArrows(arrows)

  // Proxy state in case an external component is controlling the slide index
  const _index = controls ? controls[0] : index
  const _setIndex = (val: number) =>
    controls ? controls[1](val) : setIndex(val)

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = (
    type: 'next' | 'previous' | 'index',
    targetIndex?: number
  ) => {
    const isFirst = _index === 0
    const isLast = _index === data.length - 1
    const nextIndex = type === 'next' ? _index + 1 : _index - 1

    if (autoPlay) {
      timer.restart(true)
      loop?.kill()
    }

    /**
     * Handle page indicator buttons that select a specific slide index
     */
    if (type === 'index' && targetIndex !== undefined) {
      _setIndex(targetIndex)
      loop?.toIndex(targetIndex, { duration: 0.8, ease: 'power1.inOut' })
    }

    if (type === 'next') {
      _setIndex(isLast ? 0 : nextIndex)
      loop?.next({ duration: 0.4, ease: 'power1.inOut' })
    }

    if (type === 'previous') {
      _setIndex(isFirst ? data.length - 1 : _index - 1)
      loop?.previous({ duration: 0.4, ease: 'power1.inOut' })
    }
  }

  /**
   * Handle external navigation from `controls prop`
   */
  // useEffect(() => {
  //   if (controls && controls[0] !== _index) {
  //     navigate('index', controls[0])
  //   }
  // }, [controls, navigate, _index])

  return (
    <Div
      id={id}
      ref={mergeRefs([carouselRef, measuredRef])}
      className={mergeSelectors(['carousel', className])}
      css={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        zIndex: 0,
        height,
        ...(css as object),
        button: {
          zIndex: 100,
        },
        '.slide-container': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        },
        '.slide': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          position: 'relative',
          flexShrink: 0,
          cursor: 'pointer',
        },
        '.slide-inner': {
          height: '100%',
          width: '100%',
        },
      }}
      {...props}>
      <div className="slide-container">
        {data.map((d, i) => (
          <div
            ref={addToRefs}
            className={mergeSelectors(['slide', _index === i ? ' active' : ''])}
            // {...bind()}
            key={i}>
            <div className="slide-inner">{React.cloneElement(template, d)}</div>
          </div>
        ))}
      </div>
      {_arrows ? <NavArrows navigate={navigate} settings={_arrows} /> : null}
      {_dots ? (
        <Pagination
          navigate={navigate}
          current={_index}
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
      autoPlayLimit: 2,
      draggable: false,
      infiniteScroll: false,
      hideControls: false,
      showControlsOnHover: false,
      delay: 6.5,
      duration: 0.3,
      transition: 'slide',
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
