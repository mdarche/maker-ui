import * as React from 'react'
import { jsx as emotionJsx, Interpolation } from '@emotion/react'

import { formatCSS } from './css'

/**
 * Scans JSX props for `breakpoints` and `css` to format responsive arrays
 *
 * @param props - all of the element's props
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
 * JSX that supports responsive arrays and the `breakpoints` props
 *
 * @see https://maker-ui.com/docs/jsx
 *
 */

export const jsx = <P>(
  type: React.ElementType<P>,
  props: React.Attributes & P,
  ...children: React.ReactNode[]
) => {
  return emotionJsx(type, parseProps(props), ...children)
}
