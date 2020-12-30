import { useOptions } from '../context/OptionContext'
import { format } from '../utils/helper'

type LayoutKey =
  | 'topbar'
  | 'header'
  | 'mobileMenu'
  | 'sidenav'
  | 'sidebar'
  | 'content'
  | 'workspace'

export const useMediaQuery = (type?: LayoutKey) => {
  const options = useOptions()

  /**
   * @param {string} att - the target css attribute
   * @param {array} values - an array of responsive values
   * @param {string | number} bp - index of the theme's `breakpoints` array where the
   * mobile style rule should begin or a specific breakpoint
   * @param {array} bpArray - an optional / alternate set of breakpoints
   * */

  function mediaQuery(
    att: string,
    values: number[] | string[] | (number | string)[],
    breakpoint?: string | number,
    bpArray?: number[] | string[] | (number | string)[]
  ) {
    const bp = breakpoint || (type ? options[type]['bpIndex'] : undefined)
    const mqs = bpArray || options.breakpoints

    let styles = {}
    styles[att] = values[0]

    if (typeof bp === 'string') {
      /**
       * Handle specific breakpoint
       * */
      styles[`@media (min-width: ${bp})`] = { [att]: format(values[1]) }
    } else {
      /**
       * Handle breakpoint array
       * */
      let i = 0
      while (i < values.length - 1) {
        styles[`@media (min-width: ${format(mqs[bp + i])})`] = {
          [att]: format(values[i + 1]),
        }
        i++
      }
    }
    return styles
  }

  return { mediaQuery }
}
