import * as React from 'react'
import { formatCSS } from './css'
import { objectToCSS } from './transformer'
import { StyleSettings } from './types'

export interface StyleProps
  extends React.HTMLAttributes<HTMLStyleElement>,
    StyleSettings {
  root: string
}

export const Style = ({
  id,
  root,
  global = false,
  breakpoints = [768, 1440],
  css,
  ...props
}: StyleProps) => {
  const cssString = css
    ? parseCSS({ root, global, breakpoints, css })
    : undefined
  const children = cssString ?? props.children

  return <style id={`mkui_css-${root}`} {...{ ...props, children }} />
}

function parseCSS({ root, css, breakpoints }: StyleSettings): string {
  let res = ''
  if (!css) return res
  const responsive = formatCSS(css, breakpoints)
  return objectToCSS(root, responsive).replace(/\s+/g, ' ').trim()
}
