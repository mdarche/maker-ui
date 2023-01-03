import React, {
  useCallback,
  useState,
  type MouseEvent,
  type TouchEvent,
} from 'react'
import { cn } from '@maker-ui/utils'
import { type SlideItem, SlideDirection, type CarouselClasses } from '@/types'
import { getPageX } from '@/helpers'
import { useWindowWidthChange } from '@/hooks'

export interface CanvasProps {
  items: SlideItem[]
  show: number
  slide: number
  widthCallBack: (width: number) => void
  dragCallback: (transform: number) => void
  slideCallback: (direction: SlideDirection) => void
  transition: number
  transform: number
  draggable: boolean
  dragX: number
  responsive: boolean
  infinite: boolean
  triggerClickOn: number
  classNames: CarouselClasses | null
}

export const Slider = (props: CanvasProps) => {
  const [width, setWidth] = useState(200)
  const ref = useCallback(
    (node: any) => {
      if (node !== null) {
        const calculated = node.getBoundingClientRect().width / props.show
        setWidth(calculated)
        props.widthCallBack(calculated)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width]
  )

  useWindowWidthChange((change: number) => {
    setWidth(width - change)
  }, props.responsive)

  const [drag, setDrag] = useState({
    initial: props.transform,
    start: 0,
    isDown: false,
    drag: 0,
    finished: true,
    pointers: true,
  })
  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    e.persist()
    setDrag({
      ...drag,
      isDown: true,
      start: getPageX(e),
      initial: props.transform,
      finished: false,
    })
  }
  const handleDragFinish = (e: MouseEvent | TouchEvent) => {
    e.persist()
    if (drag.finished) {
      return
    }
    if (Math.abs(drag.drag) < width * props.dragX) {
      props.dragCallback(props.transform)
      return setDrag({
        initial: props.transform,
        start: 0,
        isDown: false,
        drag: 0,
        finished: true,
        pointers: true,
      })
    }

    props.slideCallback(
      drag.drag > 0 ? SlideDirection.Right : SlideDirection.Left
    )
    setDrag({ ...drag, drag: 0, isDown: false, finished: true, pointers: true })
    return
  }
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    e.persist()
    if (!drag.isDown) {
      return
    }
    const pos = getPageX(e)
    setDrag({
      ...drag,
      drag: drag.start - pos,
      pointers: Math.abs(drag.start - pos) < props.triggerClickOn,
    })
  }
  const swipeProps = props.draggable
    ? {
        onTouchCancel: handleDragFinish,
        onTouchEnd: handleDragFinish,
        onTouchMove: handleDragMove,
        onTouchStart: handleDragStart,
        onMouseDown: handleDragStart,
        onMouseLeave: handleDragFinish,
        onMouseUp: handleDragFinish,
        onMouseMove: handleDragMove,
      }
    : {}

  return (
    <div ref={ref} className={cn(['mkui_slider', props?.classNames?.slider])}>
      <div
        className={cn(['mkui_slide_track'])}
        data-cy="slidetrack"
        {...swipeProps}
        style={{
          transform: `translateX(${props.transform - drag.drag}px)`,
          transition: `transform ${props.transition}s ease 0s`,
          width: width * props.items.length,
        }}>
        {props.items.map((item, i) => (
          <div
            key={i}
            className={cn(['mkui_slide', props?.classNames?.slide])}
            style={{ width, pointerEvents: drag.pointers ? 'all' : 'none' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
