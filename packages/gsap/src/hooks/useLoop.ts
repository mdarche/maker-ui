import { gsap } from 'gsap'
import { merge } from 'maker-ui'
import { useEffect, useState } from 'react'

interface LoopConfig {
  repeat?: number
  paused?: boolean
  speed?: number
  snap?: number | number[] | false
  paddingRight?: number
  reversed?: boolean
  ease?: string
}

const defaultConfig = {
  repeat: 0,
  paused: true,
  speed: 1,
  snap: 1,
  paddingRight: 0,
  reversed: false,
  ease: 'none',
}

export const useLoop = (items: HTMLElement[], config: LoopConfig = {}) => {
  const [loop, setLoop] = useState<GSAPTimeline | undefined>(undefined)

  useEffect(() => {
    if (!loop) {
      const slides = gsap.utils.toArray(items) as HTMLElement[]
      setLoop(horizontalLoop(slides, config))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop])

  useEffect(() => {
    return () => setLoop(undefined)
  }, [])

  function resetLoop() {
    console.log('Resetting')
    loop?.time(0).kill()
    setLoop(undefined)
  }

  return { loop, resetLoop }
}

export function horizontalLoop(items: HTMLElement[], config: LoopConfig) {
  items = gsap.utils.toArray(items)
  const { repeat, paused, speed, snap, paddingRight, reversed, ease } = merge(
    config,
    defaultConfig
  )

  let tl = gsap.timeline({
    repeat,
    paused,
    defaults: { ease },
    // @ts-ignore
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  })

  let length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    currentIndex = 0,
    pixelsPerSecond = speed * 100,
    snapFn = snap === false ? (v: any) => v : gsap.utils.snap(snap),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(
        gsap.getProperty(el, 'width', 'px') as string
      ))
      xPercents[i] = snapFn(
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
          (gsap.getProperty(el, 'xPercent') as number)
      )
      return xPercents[i]
    },
  })

  gsap.set(items, { x: 0 })
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      (gsap.getProperty(items[length - 1], 'scaleX') as number) +
    paddingRight

  for (i = 0; i < length; i++) {
    item = items[i]
    curX = (xPercents[i] / 100) * widths[i]
    distanceToStart = item.offsetLeft + curX - startX
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, 'scaleX') as number)
    tl.to(
      item,
      {
        xPercent: snapFn(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snapFn(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond)
    times[i] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index: number, vars: GSAPTweenVars = {}) {
    Math.abs(index - currentIndex) > length / 2 &&
      (index += index > currentIndex ? -length : length) // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex]
    const p1 = time > tl.time()
    const p2 = index > currentIndex
    if (p1 !== p2) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (index > currentIndex ? 1 : -1)
    }
    currentIndex = newIndex
    vars.overwrite = true
    return tl.tweenTo(time, vars)
  }

  tl.next = (vars: GSAPTweenVars) => toIndex(currentIndex + 1, vars)
  tl.previous = (vars: GSAPTweenVars) => toIndex(currentIndex - 1, vars)
  tl.current = () => currentIndex
  tl.toIndex = (index: number, vars: GSAPTweenVars) => toIndex(index, vars)
  tl.times = times
  tl.progress(1, true).progress(0, true) // pre-render for performance

  if (reversed) {
    // @ts-ignore
    tl.vars.onReverseComplete()
    tl.reverse()
  }

  return tl
}
