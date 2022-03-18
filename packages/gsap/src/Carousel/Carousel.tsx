import React, {
  useState,
  useEffect,
  useRef,
  cloneElement,
  useCallback,
} from 'react'
import { mergeSelectors, merge } from '@maker-ui/utils'
import { Div, type DivProps } from '@maker-ui/primitives'
import type { ResponsiveScale } from '@maker-ui/css'
import debounce from 'lodash.debounce'
import { useDrag } from '@use-gesture/react'

import { NavArrows } from './NavArrows'
import { Pagination } from './Pagination'
import type { CarouselSettings, ArrowSettings, DotSettings } from './types'
import { useLoop } from './useLoop'
import styles from './Carousel.styles'
import { useTimer } from './useTimer'

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
  const { autoPlay, autoPlayLimit, delay, duration, draggable } =
    mergeSettings(settings)
  // Local State
  const carouselRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(data.length)
  const slideRefs = useRef([])
  slideRefs.current = []
  const { loop, resetLoop } = useLoop(slideRefs.current)
  const { pause, resume } = useTimer(
    delay,
    autoPlayLimit * data.length,
    initAutoPlay
  )

  function addToRefs(el: any) {
    //@ts-ignore
    if (el && !slideRefs.current.includes(el)) {
      //@ts-ignore
      slideRefs.current.push(el)
    }
  }

  function initAutoPlay() {
    navigate('next', 0)
  }

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const _dots = mergeDots(dots)
  const _arrows = mergeArrows(arrows)

  // Proxy state in case an external component is controlling the slide index
  const _index = controls ? controls[0] : index

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = useCallback(
    (type: 'next' | 'previous' | 'index', targetIndex?: number) => {
      const isFirst = _index === 0
      const isLast = _index === data.length - 1
      const nextIndex = type === 'next' ? _index + 1 : _index - 1

      function _setIndex(val: number) {
        if (controls) {
          controls[1](val)
        }
        setIndex(val)
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
        if (targetIndex === 0) {
          // If intiated by autoPlay, use a debounce
          debounce(
            () => loop?.next({ duration: 0.4, ease: 'power1.inOut' }),
            500
          )
        } else {
          loop?.next({ duration: 0.4, ease: 'power1.inOut' })
        }
      }

      if (type === 'previous') {
        _setIndex(isFirst ? data.length - 1 : _index - 1)
        loop?.previous({ duration: 0.4, ease: 'power1.inOut' })
      }
    },
    [_index, controls, data.length, loop]
  )

  const bind = useDrag(
    ({ dragging, last, direction, intentional, movement: [mx] }) => {
      if (dragging) {
        pause()
      }
      if (intentional && direction[0] === -1 && Math.abs(mx) > 160 && last) {
        navigate('next')
      } else if (intentional && Math.abs(mx) > 160 && last) {
        navigate('previous')
      }
      console.log(
        'in here',
        intentional,
        last,
        direction[0],
        Math.abs(mx) > 160
      )
    }
  )

  /**
   * Handle external navigation from `controls prop`
   */
  useEffect(() => {
    if (controls && controls[0] !== index) {
      navigate('index', controls[0])
    }
  }, [controls, navigate, index])

  useEffect(() => {
    if (data.length !== length && loop) {
      navigate('index', 0)
      resetLoop()
      setLength(data.length)
    }
  }, [data, navigate, length, loop, resetLoop])

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
      id={id}
      ref={carouselRef}
      className={mergeSelectors(['carousel', className])}
      onMouseEnter={autoPlay ? pause : undefined}
      onMouseLeave={autoPlay ? resume : undefined}
      css={{
        ...merge(css as object, styles),
        height,
      }}
      {...props}>
      <div className="slide-container" {...bind()}>
        {data.map((d, i) => (
          <div
            ref={addToRefs}
            className={mergeSelectors(['slide', _index === i ? ' active' : ''])}
            key={i}>
            <div className="slide-inner">{cloneElement(template, d)}</div>
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
      autoPlay: true,
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
