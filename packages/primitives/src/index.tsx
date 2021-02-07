/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef } from 'react'
import * as CSS from 'csstype'

type ResponsiveType<T> = T | T[]

/**
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 *
 */
export interface DivProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * A div that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <div ref={ref} {...props} />
))

Div.displayName = 'Div'

/**
 * Alias for `Flex` component props that includes all
 * HTML div tag attributes.
 */

export interface FlexProps extends DivProps {
  align?: ResponsiveType<CSS.Properties['alignItems']>
  direction?: ResponsiveType<CSS.Properties['flexDirection']>
  flex?: ResponsiveType<CSS.Properties['flex']>
  inline?: boolean
  justify?: ResponsiveType<CSS.Properties['justifyContent']>
  wrap?: boolean
}

/**
 * A pre-styled div with quick access to CSS Flex properties.
 *
 * @param align - shortcut for responsive `alignItems` property
 * @param direction - shortcut for responsive `flexDirection` property
 * @param flex - shotcut for responsive `flex` property
 * @param inline - a boolean that sets the `display` property to `inline-flex`
 * @param justify - shortcut for responsive `justifyContent` property
 * @param wrap - a boolean for that sets the `flex-wrap` property to `wrap`
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ inline, align, justify, direction, flex, wrap, css, ...props }, ref) => (
    <div
      ref={ref}
      css={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : undefined,
        flex,
        ...(css as object),
      }}
      {...props}
    />
  )
)

Flex.displayName = 'Flex'

/**
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface GridProps extends MakerProps, DivProps {
  areas?: ResponsiveType<CSS.Properties['gridTemplateAreas']>
  center?: boolean
  columns?: ResponsiveType<CSS.Properties['gridTemplateColumns']>
  gap?: ResponsiveScale
  rows?: ResponsiveType<CSS.Properties['gridTemplateRows']>
}

/**
 * A pre-styled div with quick access to CSS Grid properties.
 *
 * @param areas - shortcut for responsive `gridTemplateAreas` property
 * @param center - centers all grid item content
 * @param columns - shortcut for responsive `gridTemplateColumns` property
 * @param gap - shortcut for responsive `gap` property
 * @param row - shortcut for responsive `gridTemplateRow` property
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns, rows, gap, areas, center, css, ...props }, ref) => (
    <div
      ref={ref}
      css={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gridTemplateAreas: areas,
        gap,
        placeItems: center ? 'center' : undefined,
        ...(css as object),
      }}
      {...props}
    />
  )
)

Grid.displayName = 'Grid'

/**
 * Alias for `Span` component props that includes all
 * HTML span tag attributes.
 */
export interface SpanProps
  extends MakerProps,
    React.HTMLAttributes<HTMLSpanElement> {}

/**
 * A span that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const Span = forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <span ref={ref} {...props} />
))

Span.displayName = 'Span'

/**
 * Alias for `OList` component props that includes all
 * ordered list tag attributes.
 */
export interface OListProps
  extends MakerProps,
    React.HTMLAttributes<HTMLOListElement> {}

/**
 * An ordered list that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const OList = forwardRef<HTMLOListElement, OListProps>((props, ref) => (
  <ol ref={ref} {...props} />
))

OList.displayName = 'OList'

/**
 * Alias for `UList` component props that includes all
 * unordered list tag attributes.
 */
export interface UListProps
  extends MakerProps,
    React.HTMLAttributes<HTMLUListElement> {}

/**
 * An unordered list that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const UList = forwardRef<HTMLUListElement, UListProps>((props, ref) => (
  <ul ref={ref} {...props} />
))

UList.displayName = 'UList'

/**
 * Alias for `ListItem` component props that includes all
 * list item tag attributes.
 */
export interface ListItemProps
  extends MakerProps,
    React.HTMLAttributes<HTMLLIElement> {}

/**
 * A list item that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => <li ref={ref} {...props} />
)

ListItem.displayName = 'ListItem'

/**
 * Alias for `SVG` component props that includes all
 * svg attributes.
 */
export interface SVGProps extends MakerProps, React.SVGAttributes<SVGElement> {}

/**
 * An SVG that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const SVG = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <svg ref={ref} xmlns="http://www.w3.org/2000/svg" {...props} />
))

SVG.displayName = 'SVG'

/**
 * Alias for `Button` component props that includes all
 * HTML button attributes.
 */
export interface ButtonProps
  extends MakerProps,
    React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
}

/**
 * An button that supports responsive css values and the breakpoints prop.
 *
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
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  )
)

Link.displayName = 'Link'

/**
 * Alias for `Image` component props that includes all
 * image tag attributes.
 */
export interface ImageProps
  extends MakerProps,
    React.HTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

/**
 * An image that supports responsive css values and the breakpoints prop.
 *
 * @link https://maker-ui.com/docs/primitives/
 */

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, ...props }, ref) => (
    <img ref={ref} alt={alt} src={src} {...props} />
  )
)

Image.displayName = 'Image'
