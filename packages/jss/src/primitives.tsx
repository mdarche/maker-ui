/** @jsxRuntime classic */
/** @jsx jsx */

'use client'

import { forwardRef } from 'react'
import * as CSS from 'csstype'

import { jsx } from './jsx-runtime'
import type { MakerProps, ResponsiveScale, StyleObject } from './types'

type ResponsiveType<T> = T | T[]

declare module 'react' {
  interface Attributes extends MakerProps {}
}

/**
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface DivProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * A div that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <div ref={ref} {...props} />
))

Div.displayName = 'Div'

/**
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface GridProps extends MakerProps, DivProps {
  areas?: ResponsiveType<CSS.Properties['gridTemplateAreas']>
  center?: boolean
  columns?: ResponsiveType<CSS.Properties['gridTemplateColumns']> | number
  gap?: ResponsiveScale
  columnGap?: ResponsiveScale
  rowGap?: ResponsiveScale
  rows?: ResponsiveType<CSS.Properties['gridTemplateRows']>
}

/**
 * A pre-styled div with quick access to CSS Grid properties.
 *
 * @param areas - shortcut for responsive `grid-template-areas` property
 * @param center - centers all grid item content
 * @param columns - shortcut for responsive `grid-template-columns` property
 * @param gap - shortcut for responsive `gap` property
 * @param rows - shortcut for responsive `grid-template-rows` property
 *
 * @link https://maker-ui.com/docs/primitives/
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { columns, rows, gap, columnGap, rowGap, areas, center, css, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        css={{
          display: 'grid',
          gridTemplateColumns:
            columns && typeof columns === 'number'
              ? ['1fr', `repeat(${columns}, 1fr)`]
              : columns,
          gridTemplateRows: rows,
          gridTemplateAreas: areas,
          gap,
          columnGap,
          rowGap,
          placeItems: center ? 'center' : undefined,
          ...(css as object),
        }}
        {...props}
      />
    )
  }
)

Grid.displayName = 'Grid'

/**
 * Alias for `Button` component props that includes all
 * HTML button attributes.
 */
export interface ButtonProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLButtonElement>, 'type'> {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}

/**
 * An button that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
)

Button.displayName = 'Button'

/**
 * Alias for `Link` component props that includes all
 * anchor tag attributes.
 */
export interface LinkProps
  extends MakerProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * An anchor tag that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  )
)

export { Link as A }

Link.displayName = 'Link'

export interface SectionProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  _css?: StyleObject
  maxWidth?: ResponsiveScale
  container?: boolean
}

/**
 * The `Section` component creates new content sections that support full-width
 * backgrounds with custom max-width inner content.
 *
 * @link https://maker-ui.com/docs/layout/section
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      maxWidth = 'var(--maxWidth_section)',
      background,
      color,
      container = true,
      id,
      className,
      css,
      _css,
      children,
      ...props
    },
    ref
  ) => {
    /**
     * If container is false, apply `css` prop to the root element
     */
    const rootCss = container
      ? _css
      : { ...(_css as object), ...(css as object) }
    return (
      <section
        ref={ref}
        id={id}
        className={className}
        css={{
          background,
          color,
          ...(rootCss as object),
        }}>
        {container ? (
          <div
            className="container"
            css={{
              maxWidth,
              ...(css as object),
            }}
            {...props}>
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)

Section.displayName = 'Section'
