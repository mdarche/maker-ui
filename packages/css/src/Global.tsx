import * as React from 'react'
import { Global as EmotionGlobal, Interpolation } from '@emotion/react'

import { formatCSS } from './css'

export interface GlobalProps {
  styles: Interpolation<any> | object
  breakpoints?: (string | number)[]
}

/**
 * A global style declaration that supports responsive arrays and the `breakpoints` prop
 *
 * @param styles - a CSS style object
 * @param breakpoints - an array of breakpoints
 *
 * @link https://maker-ui.com/docs/components/global
 *
 */
export const Global = ({ styles, breakpoints }: GlobalProps) => {
  return (
    <EmotionGlobal
      styles={
        formatCSS(styles as Interpolation<any>, breakpoints) as Interpolation<
          any
        >
      }
    />
  )
}
