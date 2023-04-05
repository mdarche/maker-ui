import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { Style } from '@maker-ui/style'
import {
  rotateItems,
  getTransformAmount,
  getCurrent,
  initItems,
  getShowArrow,
  updateNodes,
  cleanItems,
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
  const { ...props }: Required<CarouselProps> = merge(defaultProps, userProps)
  const [styleId] = useState(generateId())
  const containerRef = useRef<HTMLDivElement>(null)
  const initialItems = initItems(
    props.children,
    props.children.length - 1,
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
  const [page, setPage] = useState(0)
  const [autoCount, setAutoCount] = useState(0)
  const isPaginating = useRef(false)
  const slideButtonRef = useRef<HTMLButtonElement>(null)
  const autoPlayTimer = useRef<number>()

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
    setAutoCount(autoCount + 1)
    // Exit if autoPlay has run the limit
    if (
      props?.autoPlayLimit !== -1 &&
      autoCount >= props.children.length * props?.autoPlayLimit
    )
      return

    if (typeof props.autoPlay === 'number') {
      //@ts-ignore
      autoPlayTimer.current = setTimeout(() => {
        onRightArrowClick()
      }, props.autoPlay * 1000)
    }
  }

  const slide = (direction: SlideDirection, target?: number) => {
    if (animation.isSliding) {
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
      ? // ? isNavigation
        rotateNavigationItems(
          elements,
          items,
          next,
          props.show,
          slideAmount,
          direction
        )
      : rotateItems(elements, items, next, props.show, props.slide, direction)
    // : items

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

    setCurrent(typeof target === 'number' ? target : next)
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
        const cleanedItems = cleanItems(
          direction === SlideDirection.Right ? itemsRef.current : rotated,
          getNavigationSlideAmount(target, next, slideAmount, direction),
          direction
        )
        setItems(cleanedItems)
        itemsRef.current = cleanedItems
      }
      setAnimation({
        transform: props.infinite
          ? getTransformAmount(
              width,
              props.children.length - 1,
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
            props.children.length - 1,
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
      ref={containerRef}
      className={cn(['mkui-carousel', props.classNames?.root, styleId])}
      data-cy="mkui-carousel"
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
          isDefault={props?.navigation === undefined}
          factory={props.navigation || ((_, attrs) => <button {...attrs} />)}
          classNames={props?.classNames}
          length={props.children.length}
          current={current}
          onClick={onNavigate}
        />
      )}
    </div>
  )
}
