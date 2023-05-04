import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@maker-ui/utils'

interface ParallaxSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  overlay?: string
}

export const ParallaxSection = ({
  imageUrl,
  title,
  className,
  overlay,
  children,
  ...props
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (isVisible) {
      const position = window.pageYOffset
      setScrollPosition(position)
    }
  }

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
    }

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  const parallaxStyle = `translateY(${scrollPosition * 0.5}px)`

  return (
    <section
      ref={sectionRef}
      className={cn(['mkui-parallax-section relative', className])}
      {...props}>
      <div
        className="mkui-parallax-bg absolute"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: parallaxStyle,
        }}>
        {overlay && (
          <div
            className="mkui-parallax-overlay absolute cover"
            style={{ background: overlay }}
          />
        )}
      </div>
      {children}
    </section>
  )
}
