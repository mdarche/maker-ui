import { createElement } from 'react'
import { jsx as emotionJsx } from '@emotion/react'
import { parseProps } from './parse-props'
import type { MakerProps, StyleObject } from './types'

declare module 'react' {
  interface Attributes extends MakerProps {}
}

/**
 * Scans the CSS prop and returns true if every key is undefined
 *
 * @param {StyleObject} obj a CSS prop style object
 * @returns {boolean}
 */
function isEmpty(obj: StyleObject) {
  return Object.values(obj as object).every(
    (el) => el === undefined || el === null
  )
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
export const jsx = <P>(
  type: React.ElementType<P>,
  props: React.Attributes & P,
  ...children: React.ReactNode[]
) => {
  if (props?.css && isEmpty(props.css)) {
    delete props.css
    delete props?.breakpoints
  }

  return props?.css
    ? emotionJsx(type as string, parseProps(props), ...children)
    : createElement(type as string, props, ...children)
}
