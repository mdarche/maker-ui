import { createElement } from 'react'
import { jsx as emotionJsx, Interpolation } from '@emotion/react'

import { formatCSS } from './css'

/**
 * Scans JSX props for `breakpoints` and `css` to format responsive arrays
 *
 * @param props - all of the element's props
 * @returns All original props + a formatted, responsive EmotionJS `css` prop
 *
 * @internal usage only
 *
 */

function parseProps(props: any) {
  if (!props || !props.css) return props
  let next: typeof props & { css: Interpolation<any> } = {}

  for (let key in props) {
    if (key === 'css' || key === 'breakpoints') continue
    next[key] = props[key]
  }

  next.css = formatCSS(props.css, props.breakpoints)
  return next
}

/**
 * JSX that supports responsive arrays and the `breakpoints` prop. Uses normal
 * React.createElement if `breakpoints` and `css` are undefined..
 *
 * @remarks
 * This is just a prop-formatting wrapper for Emotion's jsx export
 *
 * @link https://maker-ui.com/docs/jsx
 *
 */

export const jsx = <P extends {}>(
  type: React.ElementType<P>,
  props: React.Attributes & P,
  ...children: React.ReactNode[]
) =>
  typeof props?.css !== 'undefined' || typeof props?.breakpoints !== 'undefined'
    ? emotionJsx(type, parseProps(props), ...children)
    : createElement(type, props, ...children)
