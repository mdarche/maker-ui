import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@maker-ui/utils'

interface ParallaxSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the image to be used as the parallax background. */
  imageUrl: string
  /** An optional overlay for the parallax section, typically represented as a CSS color. */
  overlay?: string
  /** The speed of the parallax effect.
   * @default 0.3 */
  speed?: number
  /** The position of the background image.
   * @default 'center' */
  backgroundPosition?: string
}

/**
 * `ParallaxSection` creates a section with a parallax scrolling effect using
 * an image URL for the background. It supports customization of the parallax
 * speed, background image position, and an optional color overlay.
 */
export const ParallaxSection = ({
  imageUrl,
  title,
  className,
  overlay,
  speed = 0.3,
  backgroundPosition = 'center',
  children,
  ...props
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const animationFrameId = useRef<number>()
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [parallaxStyle, setParallaxStyle] = useState<{
    height: string
    top: string
  }>({
    height: '0%',
    top: '0%',
  })

  const computeStyle = (sectionHeight: number, speed: number) => {
    const height = (sectionHeight * (1 + Math.abs(speed))).toFixed(2) + '%'
    const top = (-sectionHeight * Math.abs(speed) * 0.5).toFixed(2) + '%'
    setParallaxStyle({ height, top })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        const position = window.pageYOffset
        const sectionTop = sectionRef.current ? sectionRef.current.offsetTop : 0
        const sectionHeight = sectionRef.current
          ? sectionRef.current.clientHeight
          : 0
        const sectionBottom = sectionTop + sectionHeight

        if (
          position >= sectionTop - window.innerHeight &&
          position <= sectionBottom
        ) {
          const relativeScrollPosition = position - sectionTop

          if (isInitialRender && position > sectionTop) {
            setIsInitialRender(false)
          }

          setScrollPosition(isInitialRender ? position : relativeScrollPosition)
        }
      }
      animationFrameId.current = window.requestAnimationFrame(handleScroll)
    }

    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      animationFrameId.current = window.requestAnimationFrame(handleScroll)
    } else {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current)
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  useEffect(() => {
    const ref = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting))
      },
      {
        threshold: 0.1,
      }
    )

    if (ref) {
      observer.observe(sectionRef.current)
      computeStyle(ref.clientHeight, speed)
    }

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(['mkui-parallax-section', className])}
      {...props}>
      <div
        className="mkui-parallax-bg absolute"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition,
          transform: `translateY(${scrollPosition * speed}px) translateZ(0)`,
          height: parallaxStyle.height,
          top: parallaxStyle.top,
        }}
      />
      {overlay && (
        <div
          className="mkui-parallax-overlay absolute cover"
          style={{ background: overlay }}
        />
      )}
      {children}
    </section>
  )
}
