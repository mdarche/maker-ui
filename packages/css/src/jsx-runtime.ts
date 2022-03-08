import { createElement } from 'react'
import { jsx as emotionJsx } from '@emotion/react'
import { parseProps } from './parse-props'
import type { MakerProps } from './types'

declare module 'react' {
  interface Attributes extends MakerProps {}
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
) =>
  typeof props?.css !== 'undefined' || typeof props?.breakpoints !== 'undefined'
    ? emotionJsx(type, parseProps(props), ...children)
    : createElement(type, props, ...children)
