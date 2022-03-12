import React, { useEffect, useRef } from 'react'
import { Section, type SectionProps } from '@maker-ui/layout'
import { type ResponsiveScale } from '@maker-ui/css'
import { merge, mergeSelectors } from '@maker-ui/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxProps extends Omit<SectionProps, 'background' | 'translate'> {
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
  imageHeight: ResponsiveScale
  /** An intial CSS transform that marks the starting position of the image */
  imagePosition?: string
  /** Additional styles that are applied to `.image-container` */
  imageCss?: object
  /** The maxwidth of the content container where nested children are rendered */
  maxWidth?: ResponsiveScale
  /** Settings for GSAP's ScrollTrigger */
  translate?: {
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
    effect?: object
  }
  /** A simultaneous gsap.to() timeline animation object that is applied to the content container */
  textEffect?: object
  /** If false, no parallax effect will be applied */
  parallax?: boolean
  /** An extra layer of content that will be loaded above the overlay */
  layer?: React.ReactNode
}

const defaultTranslate = {
  y: 200,
  start: () => '-200px top',
  end: () => 'bottom top',
  scrub: true,
  effect: {},
}

export const Parallax = ({
  image,
  className,
  background,
  markers,
  overlay = { background: 'rgba(0,0,0,0.25)' },
  layer,
  imageHeight = 500,
  imagePosition = 'translateY(-500px)',
  maxWidth = 'var(--maxWidth_section)',
  imageCss,
  css,
  translate = {},
  textEffect,
  parallax = true,
  children,
  ...props
}: ParallaxProps) => {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const t = merge(defaultTranslate, translate)

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
        ...t.effect,
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
