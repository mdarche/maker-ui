import React, { useState, useEffect, useRef, useCallback } from 'react'
import { mergeSelectors, merge } from '@maker-ui/utils'
import { Div } from '@maker-ui/primitives'
import debounce from 'lodash.debounce'
import { useDrag } from '@use-gesture/react'

import { NavArrows } from './NavArrows'
import { Pagination } from './Pagination'
import { Slide } from './Slide'
import { mergeSettings, mergeArrows, mergeDots } from './defaults'
import type { CarouselSettings, CarouselProps, SlideProps } from './types'
import { useTimer, useLoop } from '../../hooks'
import styles from './Carousel.styles'

interface ClickState {
  [index: number]: number
}

/**
 * Use the `Carousel` component to iterate over an array of data objects or React components
 * to show an animated carousel.
 *
 * @link https://maker-ui.com/docs/gsap/carousel
 */
export const Carousel = ({
  data = [],
  template,
  settings,
  dots = {},
  arrows = {},
  height = 500,
  controls,
  overlay,
  id,
  className,
  breakpoints,
  css,
  ...props
}: CarouselProps) => {
  const {
    autoPlay,
    autoPlayLimit,
    pauseOnHover,
    delay,
    duration,
    ease,
    dragThreshold,
    draggable,
    dragTarget,
    slideWidth,
    slideHeight,
    center,
    centerMobile,
  }: CarouselSettings = mergeSettings(settings ?? {})
  const carouselRef = useRef<HTMLDivElement>(null)
  const [clicked, setClicked] = useState<ClickState>({})
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(data.length)
  const [isDragging, setIsDragging] = useState(false)
  const slideRefs = useRef([])
  slideRefs.current = []
  const { loop, resetLoop } = useLoop(slideRefs.current)
  const loopTimer = useTimer(
    delay,
    autoPlay ? autoPlayLimit * data.length : 0,
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
  const _dots = !dots ? false : mergeDots(dots || {})
  const _arrows = !arrows ? false : mergeArrows(arrows || {})
  // Proxy state in case an external component is controlling the slide index
  const _index = controls ? controls[0] : index

  /**
   * Handle external navigation from arrow buttons
   * @TODO rebuild this to include support for animated drags
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
        loop?.toIndex(targetIndex, { duration: duration * 2, ease })
      }

      if (type === 'next') {
        _setIndex(isLast ? 0 : nextIndex)
        if (targetIndex === 0 && controls) {
          // If intiated by autoPlay and using external controls, use a debounce
          debounce(() => loop?.next({ duration, ease }), 500)
        } else {
          loop?.next({ duration, ease })
        }
      }

      if (type === 'previous') {
        _setIndex(isFirst ? data.length - 1 : _index - 1)
        loop?.previous({ duration: 0.4, ease: 'power1.inOut' })
      }
    },
    [_index, controls, duration, ease, data.length, loop]
  )

  const bind = useDrag(
    //@ts-ignore
    ({ event, dragging, last, direction, intentional, movement: [mx] }) => {
      event.preventDefault()
      if (dragging && Math.abs(mx) > dragThreshold && intentional) {
        loopTimer.pause()
        setIsDragging(true)
      } else if (!dragging && Math.abs(mx) < dragThreshold) {
        setClicked((s) => ({ ...s, [_index]: (s?.[_index] ?? 0) + 1 }))
        if (
          typeof data[_index] === 'object' &&
          (data[_index] as SlideProps)?.onClick
        ) {
          //@ts-ignore
          ;(data[_index] as SlideProps)?.onClick()
        }
        // Add click callback here
        setIsDragging(false)
      }

      if (intentional && direction[0] === -1 && Math.abs(mx) > 160 && last) {
        navigate('next')
      } else if (intentional && Math.abs(mx) > 160 && last) {
        navigate('previous')
      }
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

  /**
   * Reset GSAP and loopTimer if the data prop length changes
   */
  useEffect(() => {
    if (data.length !== length && loop) {
      navigate('index', 0)
      resetLoop()
      setLength(data.length)
    }
  }, [data, navigate, length, loop, resetLoop])

  /**
   * Handle loopTimer on browser or tab focus / blur
   */
  useEffect(() => {
    const current = carouselRef.current

    if (autoPlay) {
      current?.addEventListener(`focusin`, loopTimer.pause)
      current?.addEventListener(`focusout`, loopTimer.resume)
    }

    return () => {
      current?.removeEventListener(`focusin`, loopTimer.pause)
      current?.removeEventListener(`focusout`, loopTimer.resume)
    }
  }, [loopTimer, autoPlay])

  return (
    <Div
      id={id}
      breakpoints={breakpoints}
      ref={carouselRef}
      className={mergeSelectors(['carousel', className])}
      onMouseEnter={autoPlay && pauseOnHover ? loopTimer.pause : undefined}
      onMouseLeave={autoPlay && pauseOnHover ? loopTimer.resume : undefined}
      css={{
        ...merge(css as object, styles),
        height,
      }}
      {...props}>
      <Div
        breakpoints={breakpoints}
        css={
          center
            ? {
                justifyContent: centerMobile
                  ? 'center'
                  : ['flex-start', 'center'],
              }
            : undefined
        }
        className={mergeSelectors([
          'slide-container',
          isDragging ? 'dragging' : undefined,
        ])}
        {...(draggable && dragTarget === 'container' ? bind() : {})}>
        {data.map((d, i) => (
          <Slide
            key={i}
            {...{
              index: i,
              isActive: _index === i,
              height: slideHeight,
              width: slideWidth,
              slideProps: d,
              clicked: clicked[i],
              template,
              draggable,
              dragTarget,
              bind,
              addToRefs,
            }}
          />
        ))}
      </Div>
      {overlay ? overlay : null}
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
