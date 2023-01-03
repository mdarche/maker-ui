import React, {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactElement,
} from 'react'
import { cn, generateId } from '@maker-ui/utils'
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
import { SlideDirection, SlideItem, CarouselClasses } from '@/types'
import { usePrevious } from '@/hooks'
import { Arrow } from './Arrow'
import { Slider } from './Slider'
import { Navigation } from './Navigation'
import { defaultProps } from '../default-props'
import { Style } from '@maker-ui/style'
import { css } from './style'

export interface CarouselProps {
  children: React.ReactElement[]
  /** Number of items to show per slide */
  show?: number
  /** Number of items to slide per click or swipe */
  slide?: number
  /** CSS transition duration for each slide */
  transition?: number
  /** Enable swiping and drag events for touch enabled devices*/
  swiping?: boolean
  /** Percentage of item width that triggers a slide */
  swipeOn?: number
  /** If true, slide items will change width dynamically according to the screen size */
  responsive?: boolean
  /** If true, the carousel will loop infinitely */
  infinite?: boolean
  /** Custom classNames for all carousel sub-components */
  classNames?: CarouselClasses | null
  /** If true, the left and right arrow keys can be used to navigate slides */
  useArrowKeys?: boolean
  /** Set this to true if any of your slide items are stateful. Additionally, add a unique
   * key to each item. This will prevent the carousel from unnecessary re-renders.
   */
  dynamic?: boolean
  paginationCallback?: ((direction: SlideDirection) => any) | null
  pageCount?: number
  hideArrows?: boolean
  arrows?: {
    left?: ReactElement | null
    right?: ReactElement | null
    onLeftArrowClick?: () => void
    onRightArrowClick?: () => void
  } | null
  autoSwipe?: number | null
  navigation?: null | ((selected: boolean) => ReactElement)
  triggerClickOn?: number
}

export interface CarouselState {
  items: SlideItem[]
  width: number
  transform: number
  transition: number
  isSliding: boolean
  current: number
}

export const Carousel = (userProps: CarouselProps) => {
  const props: Required<CarouselProps> = { ...defaultProps, ...userProps }
  const [styleId] = useState(generateId())
  const initialItems = initItems(
    props.children,
    props.navigation ? props.children.length - 1 : props.slide,
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
  const autoSwipeTimer = useRef<number>()
  const isNavigation = typeof props.navigation === 'function'

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
    autoSwipe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const autoSwipe = () => {
    clearTimeout(autoSwipeTimer.current)

    if (
      slideButtonRef &&
      typeof props.autoSwipe === 'number' &&
      props.autoSwipe > props.transition
    ) {
      //@ts-ignore
      autoSwipeTimer.current = setTimeout(() => {
        if (slideButtonRef.current) {
          slideButtonRef.current!.click()
        }
      }, props.autoSwipe)
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
              props.navigation ? props.children.length - 1 : props.slide,
              SlideDirection.Right
            )
          : animation.transform +
            getTransformAmount(width, props.slide, direction),
        transition: 0,
        isSliding: false,
      })
      autoSwipe()
    }, props.transition * 1_0_0_0)
    isPaginating.current = false
  }

  const widthCallBack = (calculatedWidth: number) => {
    setWidth(calculatedWidth)
    setAnimation({
      transform: props.infinite
        ? getTransformAmount(
            calculatedWidth,
            props.navigation ? props.children.length - 1 : props.slide,
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
        transition={animation.transition}
        items={itemsRef.current}
        transform={animation.transform}
        slideCallback={slideCallback}
        dragCallback={dragCallback}
        widthCallBack={widthCallBack}
        classNames={props?.classNames}
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
      {isNavigation && (
        <Navigation
          navigate={props.navigation!}
          items={props.children}
          current={current}
          onClick={onNavigate}
          classNames={props?.classNames}
        />
      )}
    </div>
  )
}
