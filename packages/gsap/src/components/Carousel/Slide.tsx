import * as React from 'react'
import { Div } from '@maker-ui/primitives'
import { ResponsiveScale } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'
import type { CarouselSettings, CarouselProps } from './types'

interface InternalSlideProps {
  index?: number
  isActive?: boolean
  height?: ResponsiveScale
  width?: ResponsiveScale
  addToRefs: (el: any) => void
  bind: (...args: any[]) => any
  template: CarouselProps['template']
  slideProps?: { [key: string]: any }
  draggable?: CarouselSettings['draggable']
  dragTarget?: CarouselSettings['dragTarget']
}

export const Slide = ({
  index,
  isActive,
  height,
  width,
  template,
  addToRefs,
  bind,
  slideProps,
  draggable,
  dragTarget,
}: InternalSlideProps) => {
  return (
    <Div
      ref={addToRefs}
      css={{ width, height }}
      className={mergeSelectors(['slide', isActive ? ' active' : ''])}
      {...(slideProps?.draggable !== false &&
      draggable &&
      dragTarget === 'slide'
        ? bind()
        : {})}>
      <div className="slide-inner">
        {template === 'custom'
          ? slideProps
          : React.cloneElement(template, {
              ...slideProps,
              index,
              isActive,
            })}
      </div>
      {slideProps?.draggable !== false &&
      draggable &&
      dragTarget === 'overlay' ? (
        <div className="dt-overlay" {...bind()} />
      ) : null}
    </Div>
  )
}
