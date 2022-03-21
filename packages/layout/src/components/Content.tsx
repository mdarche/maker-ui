/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, type MakerProps } from '@maker-ui/css'
import { mergeSelectors, setBreakpoint } from '@maker-ui/utils'
import { useState, useEffect } from 'react'

import { ErrorContainer } from './Errors'
import { ContentError } from './Errors/Errors'
import { useOptions } from '../context/OptionContext'
import { useLayoutDetector } from '../context/LayoutContext'
import { useLayoutStyles } from '../hooks/useLayoutStyles'

interface ContentProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * The `Content` component is a wrapper that reads the contents of its
 * child nodes and updates the LayoutProvider for valid layouts or throws a development error.
 *
 * Use it to wrap everything between your `Header` and `Footer` components.
 *
 * @link https://maker-ui.com/docs/layout/content
 */
export const Content = ({
  id,
  className,
  children,
  css,
  ...props
}: ContentProps) => {
  const [initialRender, setInitialRender] = useState(true)
  const { content, sideNav, breakpoints } = useOptions()
  const { layout, showError } = useLayoutDetector('content', children)

  useEffect(() => {
    setInitialRender(false)
  }, [])

  const layoutClass = layout.replace(/\s+/g, '-')
  const layoutStyles = useLayoutStyles(layout)
  const bp = layout.includes('sidenav')
    ? sideNav.breakpoint
    : content.breakpoint

  return (
    <div
      id={mergeSelectors(['site-inner', id])}
      className={mergeSelectors([`layout-${layoutClass}`, className])}
      breakpoints={setBreakpoint(bp, breakpoints)}
      style={initialRender ? { visibility: 'hidden' } : undefined}
      css={{
        ...layoutStyles,
        ...(css as object),
      }}
      {...props}>
      {showError ? (
        <ContentError />
      ) : (
        <ErrorContainer errorKey="content">{children}</ErrorContainer>
      )}
    </div>
  )
}

Content.displayName = 'Content'
