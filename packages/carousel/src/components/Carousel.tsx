import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { Style } from '@maker-ui/style'
import {
  rotateItems,
  getTransformAmount,
  getCurrent,
  initItems,
  getShowArrow,
  cleanItems,
  updateNodes,
  cleanNavigationItems,
  rotateNavigationItems,
  getNavigationSlideAmount,
} from '@/helpers'
import { SlideDirection, SlideItem, CarouselProps } from '@/types'
import { usePrevious } from '@/hooks'
import { Arrow } from './Arrow'
import { Slider } from './Slider'
import { Pagination } from './Pagination'
import { defaultProps } from '../default-props'

import { css } from './style'

export interface CarouselState {
  items: SlideItem[]
  width: number
  transform: number
  transition: number
  isSliding: boolean
  current: number
}

export const Carousel = (userProps: CarouselProps) => {
  const props: Required<CarouselProps> = merge(defaultProps, userProps)
  const isNavigation =
    props.navigation !== undefined && typeof props.navigation === 'function'
  const [styleId] = useState(generateId())
  const initialItems = initItems(
    props.children,
    isNavigation ? props.children.length - 1 : props.slide,
    props.infinite
  )
  const [items, setItems] = useState(initialItems)
  const itemsRef = useRef(initialItems)
  const [width, setWidth] = useState(0)
  const [animation, setAnimation] = useState({
    transform: 0,
    transition: 0,
    isSliding: false,
  })
  const [current, setCurrent] = useState(0)
  const [showArrow, setShowArrow] = useState(
    getShowArrow({
      itemCount: props.children.length,
      itemsToShow: props.show,
      infinite: props.infinite,
      current,
      hideArrows: props.hideArrows,
    })
  )
  const prevChildren = usePrevious<SlideItem[]>(userProps.children)
  const [page, setPage] = useState<number>(0)
  const isPaginating = useRef(false)
  const slideButtonRef = useRef<HTMLButtonElement>(null)
  const autoPlayTimer = useRef<number>()
  // const isNavigation = typeof props.navigation === 'function'

  useEffect(() => {
    if (!props.dynamic) return
    const newItems = updateNodes(
      itemsRef.current,
      props.children,
      prevChildren,
      props.slide,
      props.infinite
    )

    setItems(newItems)
    itemsRef.current = newItems
    if (
      page < props.pageCount &&
      prevChildren &&
      prevChildren?.length < props.children.length
    ) {
      slide(SlideDirection.Right)
      setPage(page + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children])

  useEffect(() => {
    autoPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const autoPlay = () => {
    clearTimeout(autoPlayTimer.current)

    if (
      slideButtonRef &&
      typeof props.autoPlay === 'number' &&
      props.autoPlay > props.transition
    ) {
      //@ts-ignore
      autoPlayTimer.current = setTimeout(() => {
        if (slideButtonRef.current) {
          slideButtonRef.current!.click()
        }
      }, props.autoPlay)
    }
  }

  const slide = (direction: SlideDirection, target?: number) => {
    if (
      animation.isSliding ||
      (direction === SlideDirection.Right && !showArrow.right) ||
      (direction === SlideDirection.Left && !showArrow.left)
    ) {
      return
    }

    if (
      props.paginationCallback &&
      direction === SlideDirection.Right &&
      page < props.pageCount - 1 &&
      !isPaginating.current
    ) {
      isPaginating.current = true
      props.paginationCallback(direction)
      return
    }

    const elements = props.children

    const next = getCurrent(current, props.slide, elements.length, direction)

    const slideAmount =
      typeof target === 'number' ? target - current : -1 * direction

    const rotated = props.infinite
      ? isNavigation
        ? rotateNavigationItems(
            elements,
            items,
            next,
            props.show,
            slideAmount,
            direction
          )
        : rotateItems(elements, items, next, props.show, props.slide, direction)
      : items

    if (props.infinite && direction === SlideDirection.Right) {
      setItems(rotated)
      itemsRef.current = rotated
    }

    setAnimation({
      transform:
        animation.transform +
        Math.abs(slideAmount) *
          getTransformAmount(width, props.slide, direction),
      transition: props.transition,
      isSliding: true,
    })

    setCurrent(isNavigation && typeof target === 'number' ? target : next)
    setShowArrow(
      getShowArrow({
        itemCount: elements.length,
        itemsToShow: props.show,
        infinite: props.infinite,
        current: next,
        hideArrows: props.hideArrows,
      })
    )

    setTimeout(() => {
      if (props.infinite) {
        const cleanedItems = isNavigation
          ? cleanNavigationItems(
              direction === SlideDirection.Right ? itemsRef.current : rotated,
              getNavigationSlideAmount(target, next, slideAmount, direction),
              direction
            )
          : cleanItems(
              direction === SlideDirection.Right ? itemsRef.current : rotated,
              props.slide,
              direction
            )

        setItems(cleanedItems)
        itemsRef.current = cleanedItems
      }
      setAnimation({
        transform: props.infinite
          ? getTransformAmount(
              width,
              isNavigation ? props.children.length - 1 : props.slide,
              SlideDirection.Right
            )
          : animation.transform +
            getTransformAmount(width, props.slide, direction),
        transition: 0,
        isSliding: false,
      })
      autoPlay()
    }, props.transition * 1_0_0_0)
    isPaginating.current = false
  }

  const widthCallBack = (calculatedWidth: number) => {
    setWidth(calculatedWidth)
    setAnimation({
      transform: props.infinite
        ? getTransformAmount(
            calculatedWidth,
            isNavigation ? props.children.length - 1 : props.slide,
            SlideDirection.Right
          )
        : 0,
      transition: 0,
      isSliding: false,
    })
  }

  const dragCallback = (translateX: number) => {
    setAnimation({
      transform: translateX,
      transition: props.transition,
      isSliding: false,
    })
    setTimeout(
      () => setAnimation({ ...animation, transition: 0 }),
      props.transition * 1_0_0_0
    )
  }

  const slideCallback = (direction: SlideDirection) => {
    slide(direction)
  }

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') {
      slide(SlideDirection.Left)
    } else if (e.code === 'ArrowRight') {
      slide(SlideDirection.Right)
    }
  }

  const onNavigate = (i: number) => {
    if (current !== i) {
      slide(i > current ? SlideDirection.Right : SlideDirection.Left, i)
    }
  }

  /**
   * Handles left arrow click events
   */
  const onLeftArrowClick = () => {
    slide(SlideDirection.Left)
    if (props.arrows?.onLeftArrowClick) {
      props.arrows.onLeftArrowClick()
    }
  }

  /**
   * Handles right arrow click events
   */
  const onRightArrowClick = () => {
    slide(SlideDirection.Right)
    if (props.arrows?.onRightArrowClick) {
      props.arrows.onRightArrowClick()
    }
  }

  return (
    <div
      className={cn(['mkui_carousel', props.classNames?.root, styleId])}
      data-cy="mkui_carousel"
      tabIndex={0}
      {...(props.useArrowKeys ? { onKeyDown: handleOnKeyDown } : {})}>
      <Style root={styleId} css={css} />
      {showArrow.left && (
        <Arrow
          direction="left"
          className={props?.classNames?.arrow}
          custom={props.arrows?.left}
          onClick={onLeftArrowClick}
        />
      )}
      <Slider
        {...props}
        items={itemsRef.current}
        classNames={props?.classNames}
        transition={animation.transition}
        transform={animation.transform}
        slideCallback={slideCallback}
        dragCallback={dragCallback}
        widthCallBack={widthCallBack}
      />
      {showArrow.right && (
        <Arrow
          direction="right"
          ref={slideButtonRef}
          className={props?.classNames?.arrow}
          custom={props.arrows?.right}
          onClick={onRightArrowClick}
        />
      )}
      {!props.hidePagination && (
        <Pagination
          factory={props.navigation}
          classNames={props?.classNames}
          length={props.children.length}
          current={current}
          onClick={onNavigate}
        />
      )}
    </div>
  )
}
