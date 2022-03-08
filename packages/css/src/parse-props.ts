import { formatCSS } from './css'
import type { Interpolation } from './types'

/**
 * Scans JSX props for `breakpoints` and `css` to format responsive arrays
 *
 * @param props - all of the element's props
 * @returns All original props + a formatted, responsive EmotionJS `css` prop
 *
 * @internal usage only
 *
 */
export function parseProps(props: any) {
  if (!props || !props.css) return props
  let next: typeof props & { css: Interpolation<any> } = {}

  for (let key in props) {
    if (key === 'css' || key === 'breakpoints') continue
    next[key] = props[key]
  }

  next.css = formatCSS(props.css, props.breakpoints)
  return next
}
