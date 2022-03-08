/** @jsx jsx */

import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef } from 'react'
import * as CSS from 'csstype'

type ResponsiveType<T> = T | T[]

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
 * Alias for `Flex` component props that includes all
 * HTML div tag attributes.
 */
export interface FlexProps extends DivProps {
  align?: ResponsiveType<CSS.Properties['alignItems']>
  column?: boolean
  flex?: ResponsiveType<CSS.Properties['flex']>
  inline?: boolean
  justify?: ResponsiveType<CSS.Properties['justifyContent']>
  wrap?: boolean
}

/**
 * A pre-styled div with quick access to CSS Flex properties.
 *
 * @param align - shortcut for responsive `align-items` property
 * @param column - shortcut for responsive `flex-direction` property
 * @param flex - shortcut for responsive `flex` property
 * @param inline - a boolean that sets the `display` property to `inline-flex`
 * @param justify - shortcut for responsive `justify-content` property
 * @param wrap - a boolean for that sets the `flex-wrap` property to `wrap`
 *
 * @link https://maker-ui.com/docs/primitives/
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ inline, align, justify, column, flex, wrap, css, ...props }, ref) => (
    <div
      ref={ref}
      css={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: align,
        justifyContent: justify,
        flexDirection: column ? 'column' : undefined,
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
 * @param areas - shortcut for responsive `grid-template-areas` property
 * @param center - centers all grid item content
 * @param columns - shortcut for responsive `grid-template-columns` property
 * @param gap - shortcut for responsive `gap` property
 * @param rows - shortcut for responsive `grid-template-rows` property
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
 * Alias for `Table` component props that includes all
 * HTML table tag attributes.
 */
export interface TableProps
  extends MakerProps,
    React.HTMLAttributes<HTMLTableElement> {}

/**
 * A table that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => (
  <table ref={ref} {...props} />
))

Table.displayName = 'Table'

/**
 * Alias for `Span` component props that includes all
 * HTML span tag attributes.
 */
export interface SpanProps
  extends MakerProps,
    React.HTMLAttributes<HTMLSpanElement> {}

/**
 * A span that supports responsive css values and the breakpoints prop.
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
 * @link https://maker-ui.com/docs/primitives/
 */
export const OList = forwardRef<HTMLOListElement, OListProps>((props, ref) => (
  <ol ref={ref} {...props} />
))

export { OList as Ol }

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
 * @link https://maker-ui.com/docs/primitives/
 */
export const UList = forwardRef<HTMLUListElement, UListProps>((props, ref) => (
  <ul ref={ref} {...props} />
))

export { UList as Ul }

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
 * @link https://maker-ui.com/docs/primitives/
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => <li ref={ref} {...props} />
)

export { ListItem as Li }

ListItem.displayName = 'ListItem'

/**
 * Alias for `SVG` component props that includes all
 * svg attributes.
 */
export interface SVGProps extends MakerProps, React.SVGAttributes<SVGElement> {}

/**
 * An SVG that supports responsive css values and the breakpoints prop.
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
 * @link https://maker-ui.com/docs/primitives/
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, ...props }, ref) => (
    <img ref={ref} alt={alt} src={src} {...props} />
  )
)

export { Image as Img }

Image.displayName = 'Image'

/**
 * Alias for an the Paragraph component that includes all p tag attributes.
 */
export interface ParagraphProps
  extends MakerProps,
    React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * A p tag that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const P = forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <p ref={ref} {...props}>
      {children}
    </p>
  )
)

export { P as Paragraph }

P.displayName = 'P'

/**
 * Alias for an H component that includes all
 * h1 - h6 tag attributes.
 */
export interface HeadingProps
  extends MakerProps,
    React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * An h1 that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <h1 ref={ref} {...props}>
      {children}
    </h1>
  )
)

H1.displayName = 'H1'

/**
 * An h2 that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <h2 ref={ref} {...props}>
      {children}
    </h2>
  )
)

H2.displayName = 'H2'

/**
 * An h3 that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <h3 ref={ref} {...props}>
      {children}
    </h3>
  )
)

H3.displayName = 'H3'

/**
 * An h4 that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <h4 ref={ref} {...props}>
      {children}
    </h4>
  )
)

H4.displayName = 'H4'

/**
 * An h5 that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <h5 ref={ref} {...props}>
      {children}
    </h5>
  )
)

H5.displayName = 'H5'

/**
 * An h6 that supports responsive css values and the breakpoints prop.
 * @link https://maker-ui.com/docs/primitives/
 */
export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, ...props }, ref) => (
    <h6 ref={ref} {...props}>
      {children}
    </h6>
  )
)

H6.displayName = 'H6'
