import React, { useEffect, useRef } from 'react'
import { Section, type SectionProps } from '@maker-ui/layout'
import { type ResponsiveScale } from '@maker-ui/css'
import { merge, mergeSelectors } from '@maker-ui/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ParallaxProps
  extends Omit<SectionProps, 'background' | 'translate'> {
  /** An object of <img /> tag props or a custom component like Next/Image
   * @remark If using Next.js Image, make sure you set the Image props to
   * `layout='fill'` and `objectFit='cover'`
   */
  image: React.HTMLAttributes<HTMLImageElement> | React.ReactNode
  /** Optional ScrollTrigger markers for testing and debugging */
  markers?: boolean
  /** Background CSS attribute for the section root container */
  background?: ResponsiveScale
  /** Settings for the image overlay or a false boolean to remove it */
  overlay?: { background: string } | false
  /** The height of the actual background image */
  imageHeight?: ResponsiveScale
  /** An intial CSS transform that marks the starting position of the image */
  imagePosition?: ResponsiveScale
  /** Additional styles that are applied to `.image-container` */
  imageCss?: object
  /** The maxwidth of the content container where nested children are rendered */
  maxWidth?: ResponsiveScale
  /** Settings for GSAP's ScrollTrigger */
  effect?: {
    /** Image y translation */
    y?: number | string
    /** Image yPercent translation */
    yPercent?: number
    /** GSAP ScrollTrigger start marker */
    start?: string | (() => string)
    /** GSAP ScrollTrigger end marker */
    end?: string | (() => string)
    /** GSAP ScrollTrigger scrub */
    scrub?: number | boolean
    /** Additional GSAP timeline animation properties */
    custom?: object
  }
  /** A simultaneous gsap.to() timeline animation object that is applied to the content container */
  textEffect?: object
  /** If false, no parallax effect will be applied */
  parallax?: boolean
  /** An extra layer of content that will be loaded above the overlay */
  layer?: React.ReactNode
}

const defaultEffect = {
  y: 200,
  start: () => '-200px top',
  end: () => 'bottom top',
  scrub: true,
  custom: {},
}

export const Parallax = ({
  image,
  className,
  background,
  markers,
  overlay = { background: 'rgba(0,0,0,0.25)' },
  layer,
  imageHeight = [800, 1500, 2000],
  imagePosition = 'translateY(-500px)',
  maxWidth = 'var(--maxWidth_section)',
  imageCss,
  css,
  effect = {},
  textEffect,
  parallax = true,
  children,
  ...props
}: ParallaxProps) => {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const t = merge(defaultEffect, effect)

  useEffect(() => {
    if (parallax) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current || undefined,
          markers,
          start: t.start,
          end: t.end,
          scrub: t.scrub,
        },
      })

      tl.to(ref.current, {
        y: t.yPercent ? undefined : t.y,
        yPercent: t.yPercent,
        ...t.custom,
      })
      if (textEffect) {
        tl.to(containerRef.current, textEffect, 0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Section
      ref={sectionRef}
      className={mergeSelectors(['parallax', className])}
      container={false}
      css={{
        position: 'relative',
        overflow: 'hidden',
        background,
        '.overlay': {
          background: overlay !== false ? overlay?.background : undefined,
        },
        '.parallax-image': {
          transform: imagePosition,
          ...imageCss,
        },
        '.parallax-image-wrap': {
          position: 'relative',
          height: imageHeight,
        },
        '.parallax-body': {
          zIndex: 10,
          position: 'relative',
          maxWidth,
          margin: '0 auto',
        },
        img: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        },
        ...(css as object),
      }}
      {...props}>
      <div className="parallax-image absolute cover">
        <div ref={ref} className="parallax-image-wrap">
          {React.isValidElement(image) ? (
            image
          ) : (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              className="absolute cover"
              {...(image as React.HTMLAttributes<HTMLImageElement>)}
            />
          )}
        </div>
      </div>
      {overlay ? <div className="overlay absolute cover" /> : null}
      {layer ? layer : null}
      <div ref={containerRef} className="parallax-body">
        {children}
      </div>
    </Section>
  )
}

Parallax.displayName = 'Parallax'
