import React, { useEffect, useRef } from 'react'
import { cn } from '@maker-ui/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TranslateObject = {
  opacity?: number
  yPercent?: number
  y?: number
  xPercent?: number
  x?: number
}

function getTranslation(
  fade: boolean,
  distance: string | number,
  direction: 'up' | 'down' | 'left' | 'right'
): TranslateObject {
  const isPercent = typeof distance === 'string' && distance.includes('%')
  const value =
    typeof distance === 'number'
      ? getSign(distance)
      : isPercent
      ? getSign(parseFloat(distance))
      : getSign(10) // default
  let e: TranslateObject = { opacity: fade ? 0 : undefined }

  function getSign(x: number) {
    return direction === 'down' || direction === 'right' ? -x : x
  }

  if (direction === 'up' || direction === 'down') {
    e['yPercent'] = isPercent ? value : undefined
    e['y'] = !isPercent ? value : undefined
  }

  if (direction === 'left' || direction === 'right') {
    e['xPercent'] = isPercent ? value : undefined
    e['x'] = !isPercent ? value : undefined
  }

  return e
}

export interface ScrollRevealProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The className shared by all components in the group */
  group?: string
  /** A number representing the duration in seconds between batch animations
   * @default 0.1
   */
  stagger?: number
  /** If false, no scroll effect will be applied */
  scrollEffect?: boolean
  /** When true, the component's starting opacity will be 0
   * @default true
   */
  fade?: boolean
  /** The direction of the component's `translate` style
   * @default "up"
   */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** A percentage (string) or a number value (in pixels) for how far the target should translate
   * @remark Don't use a negative value here. Instead, use the `direction` prop.
   * @default 10
   */
  distance?: number | string
  /** A custom GSAP effect that will replace all settings from the `fade`,
   * `direction`, and `distance` props. */
  effect?: object
  /** GSAP ScrollTrigger start marker
   * @default "top center"
   */
  start?: string | (() => string)
  /** GSAP ScrollTrigger end marker
   * @default "+=30px"
   */
  end?: string | (() => string)
  /** GSAP ScrollTrigger scrub
   * @default false
   */
  scrub?: number | boolean
  /** Optional ScrollTrigger markers for testing and debugging
   * @default false
   */
  markers?: boolean
  /** An optional React ref that serves as the trigger element for the `start` and `end` props.
   * @remark This prop only works for individual elements, not `group` animations.
   */
  trigger?: Element | string
  /** If true, the animation effect will reverse when users scroll up
   * @default false
   */
  reverse?: boolean
  /** An object that lets you configure any / all additional gsap ScrollTrigger props
   * @remark This will overwrite any existing duplicate properties
   * @link https://greensock.com/docs/v3/Plugins/ScrollTrigger
   */
  advancedSettings?: object
}

export const ScrollReveal = ({
  className,
  markers,
  group,
  stagger = 0.1,
  scrollEffect = true,
  fade = true,
  distance = 10,
  direction = 'up',
  start = () => 'top center',
  end = () => '+=30px',
  scrub = false,
  effect,
  reverse = false,
  trigger,
  advancedSettings,
  children,
  ...props
}: ScrollRevealProps) => {
  const ref = useRef(null)
  const translate = getTranslation(fade, distance, direction)

  useEffect(() => {
    if (scrollEffect && !group) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger ? trigger : ref.current || undefined,
          toggleActions:
            !scrub && reverse
              ? 'play none none reverse'
              : 'play none none none',
          markers,
          start,
          end,
          scrub,
          ...advancedSettings,
        },
      })
      tl.from(ref.current, effect ? effect : translate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollEffect && group) {
      // Set initial state
      gsap.set(`.${group}`, {
        ...(effect ? effect : translate),
      })

      ScrollTrigger.batch(`.${group}`, {
        // @ts-ignore
        markers,
        onEnter: (batch) =>
          gsap.to(batch, {
            ...(effect
              ? effect
              : {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotation: 0,
                  scale: 1,
                  scaleX: 1,
                  scaleY: 1,
                  yPercent: 0,
                  xPercent: 0,
                }),
            stagger,
          }),
        onLeaveBack: reverse
          ? (batch) =>
              gsap.to(batch, {
                ...(effect ? effect : translate),
                stagger,
              })
          : undefined,
        start,
        end,
        ...advancedSettings,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn(['mkui-scroll', className])} ref={ref} {...props}>
      {children}
    </div>
  )
}

ScrollReveal.displayName = ScrollReveal
