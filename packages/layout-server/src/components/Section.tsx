import * as React from 'react'
import { generateId, isObjectEmpty, cn } from '@maker-ui/utils'
import { type MakerCSS, Style } from '@maker-ui/style'

export interface SectionProps
  extends MakerCSS,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string
  maxWidth?: string
  container?: boolean
}

/**
 * The `Section` component creates new content sections that support full-width
 * backgrounds with custom max-width inner content.
 *
 * @link https://maker-ui.com/docs/layout/section
 */
export const Section = ({
  id,
  className,
  maxWidth,
  background,
  container = true,
  css,
  breakpoints,
  mediaQuery,
  children,
  ...props
}: SectionProps) => {
  const styleId = generateId()
  const hasStyle = !isObjectEmpty(css)

  return (
    <section
      id={id}
      className={cn([className, hasStyle ? styleId : undefined])}
      style={background ? { background } : undefined}>
      {container ? (
        <div
          className="mkui-container"
          style={maxWidth ? { maxWidth } : undefined}
          {...props}>
          <Style
            root={styleId}
            css={css}
            breakpoints={breakpoints}
            mediaQuery={mediaQuery}
          />
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

Section.displayName = 'Section'
