import React, { useEffect, useRef } from 'react'
import { createLines, formatUnit, getStyles } from './utils'
import { cn } from '@maker-ui/utils'

type AnimationType =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale'

export interface AnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The className shared by all nested components that should be animated.
   * If empty, the `Animate` container component will be animated.
   */
  selector?: string
  /** A number representing the duration in seconds between batch animations
   * @default 0
   */
  stagger?: number
  /** The number of pixels to the bottom of the viewport before the animation is triggered.
   * @default 0
   */
  bottom?: number
  /** The threshold value for the IntersectionObserver
   * @default 0.2
   */
  threshold?: number
  /** If true, the animation effect will reverse when the element enters and exits the viewport.
   * @default false
   */
  reverse?: boolean
  /** The type of animation to apply.
   * @default "fade"
   */
  type?: AnimationType
  /** The duration of the animation.
   * Can be a number that will be converted to seconds or a string.
   * @default "0.2s"
   */
  duration?: string | number
  /** The distance the element will translate on the x or y axis.
   * Can be a number that will be converted to pixels or a string with custom unit.
   * @default 10
   */
  distance?: string | number
  /** The starting scale value for the animation. Can be a number or a string.
   * @default 0.8
   */
  scale?: string | number
  /** The transform-origin value for the animation
   * @default "center"
   */
  transformOrigin?: string
  /** The easing function for the animation.
   * @default "ease-in-out"
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
   */
  easing?: string
  markers?: boolean
}

/**
 * `AnimateGroup` uses the IntersectionObserver API to stagger the entrance animations of nested
 *  components via className selector. You can also reverse the animations when users scroll up.
 */
export const Animate = ({
  selector,
  stagger = 0,
  bottom = 0,
  threshold = 0.2,
  type = 'fade',
  duration = '0.2s',
  easing = 'ease-in-out',
  distance = 10,
  transformOrigin = 'center',
  scale = 0.8,
  reverse = false,
  markers = false,
  children,
  ...props
}: AnimateProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const prevScrollPos = useRef<number>(window.pageYOffset)

  // Set up the IntersectionObserver to animate the elements
  useEffect(() => {
    const wrapper = ref.current
    if (!wrapper) return

    const s = `.${selector}`
    console.log('s is', s)
    const rootMargin = `0px 0px ${formatUnit(bottom)} 0px`
    const { intersectionLine: red, containerLine: green } = createLines(
      wrapper,
      bottom,
      markers
    )

    const animateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = index * stagger
            const element = entry.target as HTMLElement
            if (!element.style.animationDelay) {
              element.style.animationDelay = `${delay}ms`
            }
            element.classList.remove('mkui-not-animated')
            element.classList.add('mkui-animate', type)
          }
        })
      },
      { threshold, rootMargin }
    )

    const elements = selector ? wrapper.querySelectorAll(s) : [wrapper]
    elements.forEach((element) => {
      animateObserver.observe(element)
      element.classList.add('mkui-not-animated')
      element.classList.remove('mkui-animate')
    })

    if (reverse) {
      const reverseObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement
            const currentScrollPos = window.pageYOffset
            const isScrollingUp = prevScrollPos.current > currentScrollPos

            if (!entry.isIntersecting && isScrollingUp) {
              element.classList.remove(type)
              element.classList.add(`${type}-reverse`)
              // if (selector) {
              //   element.querySelectorAll(s).forEach((item) => {
              //     item.classList.remove(type)
              //     item.classList.add(`${type}-reverse`)
              //   })
              // } else {

              // }
            } else {
              element.classList.remove(`${type}-reverse`)
              element.classList.add(type)
              // if (selector) {
              //   element.querySelectorAll(s).forEach((item) => {
              //     item.classList.remove(`${type}-reverse`)
              //     item.classList.add(type)
              //   })
              // } else {
              //   element.classList.remove(`${type}-reverse`)
              //   element.classList.add(type)
              // }
            }
            prevScrollPos.current = currentScrollPos
          })
        },
        { threshold, rootMargin }
      )

      elements.forEach((element) => {
        reverseObserver.observe(element)
      })

      return () => {
        animateObserver.disconnect()
        reverseObserver.disconnect()
        if (markers && red && green) {
          document.body.removeChild(red)
          document.body.removeChild(green)
        }
      }
    } else {
      return () => {
        animateObserver.disconnect()
        if (markers && red && green) {
          document.body.removeChild(red)
          document.body.removeChild(green)
        }
      }
    }
  }, [selector, stagger, bottom, type, threshold, markers, distance, reverse])

  // Set up the CSS variables for the animation
  const styles = getStyles({
    duration,
    easing,
    distance,
    scale,
    transformOrigin,
  })

  return (
    <div
      ref={ref}
      className={cn([
        'mkui-animate-group',
        selector ? undefined : `mkui-animate ${type}`,
      ])}
      style={styles}
      {...props}>
      {children}
    </div>
  )
}
