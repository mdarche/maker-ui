import * as React from 'react'
import { Global as EmotionGlobal, Interpolation } from '@emotion/react'

import { formatCSS } from './css'

interface GlobalProps {
  styles: Interpolation<any>
  breakpoints?: (string | number)[]
}

/**
 * A global style declaration that supports responsive arrays and the `breakpoints` prop
 *
 * @param styles - a CSS style object
 * @param breakpoints - an array of breakpoints
 *
 * @see https://maker-ui.com/docs/global
 *
 */
export const Global = ({ styles, breakpoints }: GlobalProps) => {
  return (
    <EmotionGlobal
      styles={formatCSS(styles, breakpoints) as Interpolation<any>}
    />
  )
}
