import * as React from 'react'
import { jsx as emotionJsx, Interpolation } from '@emotion/react'

const defaultBreakpoints = ['768px', '960px', '1440px']
type Breakpoint = (string | number)[]

function responsive(styles: Interpolation<any>, breakpoints: Breakpoint) {
  let next = {}
  for (const [key, value] of Object.entries(styles)) {
    if (value === null) continue
    // If value is not an array
    if (!Array.isArray(value)) {
      next[key] = value
      continue
    }
    // If value is an array
    // TODO make this a for loop
    next[key] = value[0]
    let i = 0
    while (i < value.length - 1) {
      next[`@media screen and (min-width: ${breakpoints[i]})`] = {
        [key]: value[i + 1],
      }
      i++
    }
  }
  return next
}

export const formatCSS = (
  css: Interpolation<any>,
  breakpoints?: Breakpoint
) => (theme: any) => {
  let result = {}

  // Get breakpoints from JSX props, the Layout Provider, or default values
  const bp = breakpoints || theme.breakpoints || defaultBreakpoints
  const styles = responsive(css, bp)

  for (const [key, value] of Object.entries(styles)) {
    const val = typeof value === 'function' ? value(theme) : value

    if (value && typeof value === 'object') {
      result[key] = val
      continue
    }
    result[key] = val
  }

  return result
}

function parseProps(props: any) {
  if (!props || !props.css) return props
  let next: typeof props & { css: Interpolation<any> } = {}
  for (let key in props) {
    if (key === 'css' || key === 'breakpoints') continue
    next[key] = props[key]
  }

  console.log('props are', props)
  next.css = formatCSS(props.css, props.breakpoints)
  return next
}

export const jsx = <P>(
  type: React.ElementType<P>,
  props: React.Attributes & P,
  ...children: React.ReactNode[]
) => {
  return emotionJsx(type, parseProps(props), ...children)
}
