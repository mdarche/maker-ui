import React, { useState, type MouseEvent, type TouchEvent } from 'react'
import { cn } from '@maker-ui/utils'
import { type SlideItem, SlideDirection, type CarouselClasses } from '@/types'
import { getPageX } from '@/helpers'

export interface SliderProps {
  items: SlideItem[]
  show: number
  slide: number
  width?: number
  dragCallback: (transform: number) => void
  slideCallback: (direction: SlideDirection) => void
  transition: number
  transform: number
  draggable: boolean
  dragX: number
  responsive: boolean
  infinite: boolean
  triggerClickOn: number
  overlay?: React.ReactNode
  classNames: CarouselClasses | null
}

export const Slider = ({ width = 0, ...props }: SliderProps) => {
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
    <div className={cn(['mkui-slider', props?.classNames?.slider])}>
      <div
        className={cn(['mkui-slide-track'])}
        data-cy="slide-track"
        {...(props?.overlay ? {} : swipeProps)}
        style={{
          transform: `translateX(${props.transform - drag.drag}px)`,
          transition: `transform ${props.transition}s ease 0s`,
          width: width * props.items.length,
        }}>
        {props.items.map((item, i) => (
          <div
            key={i}
            className={cn(['mkui-slide', props?.classNames?.slide])}
            style={{
              width: width / props.show,
              pointerEvents: drag.pointers ? 'all' : 'none',
            }}>
            {item}
          </div>
        ))}
      </div>
      {props.overlay ? (
        <div
          className="mkui-carousel-overlay"
          {...(props?.overlay ? swipeProps : {})}>
          {props.overlay}
        </div>
      ) : null}
    </div>
  )
}
