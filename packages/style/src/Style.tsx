import * as React from 'react'
import { generateCSS } from './css'
import { StyleSettings } from './types'

export interface StyleProps
  extends React.HTMLAttributes<HTMLStyleElement>,
    StyleSettings {}

/**
 * The Style component is used to generate CSS styles for a component. You can pass a deeply
 * nested object of CSS style rules and the Style component will generate the equivalent
 * CSS string.
 *
 * The Style component generates media queries for array-based styles using optional breakpoints
 * from the `breakpoints` prop or the default breakpoints, `[768, 960, 1440]`.
 */
export const Style = ({
  id,
  breakpoints,
  css,
  root = 'global',
  mediaQuery = 'min-width',
  ...props
}: StyleProps) => {
  const cssString = css
    ? generateCSS({ css, root, breakpoints, mediaQuery })
    : undefined
  return (
    <style
      id={`css-${root}`}
      {...{ ...props, children: cssString ?? props.children }}
    />
  )
}
