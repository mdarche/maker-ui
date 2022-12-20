import * as React from 'react'
import { formatCSS } from './css'
import { objectToCSS } from './transformer'
import { StyleSettings } from './types'

export interface StyleProps
  extends Omit<React.HTMLAttributes<HTMLStyleElement>, 'id'>,
    StyleSettings {}

export const Style = ({
  id,
  global = false,
  breakpoints = [768, 1440],
  css,
  ...props
}: StyleProps) => {
  const cssString = css ? parseCSS({ id, global, breakpoints, css }) : undefined
  const children = cssString ?? props.children

  return <style id={`mkui_style-${id}`} {...{ ...props, children }} />
}

function parseCSS({ id, css, breakpoints }: StyleSettings): string {
  let res = ''
  if (!css) return res
  const formatted = formatCSS(css, breakpoints)
  return objectToCSS(id, formatted).trim()
}
