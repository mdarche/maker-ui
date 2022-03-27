import * as React from 'react'
import type { SVGProps } from '@maker-ui/primitives'
import { merge } from '@maker-ui/utils'
// Spinners
import { Bars } from './Bars'
import { Basic } from './Basic'
import { Blocks } from './Blocks'
import { Dots } from './Dots'
import { DotSpinner } from './DotSpinner'
import { Gear } from './Gear'
import { Pulse } from './Pulse'

const defaults: SpinnerProps = {
  type: 'default',
  size: 80,
  colors: {
    primary: '#0e94d4',
    secondary: '#58c5fa',
    third: '#9ad8f6',
    fourth: '#d2d2d2',
  },
}

export interface SpinnerProps extends SVGProps {
  /** All prebuilt spinner types */
  type:
    | 'default'
    | 'pulse'
    | 'dot-spinner'
    | 'blocks'
    | 'dots'
    | 'basic'
    | 'gear'
    | 'bars'
  /** A number in pixels that will determine the width and height of the spinner.
   * Each spinner is a perfect square.
   */
  size: number
  /** A dictionary of colors that are applied to various parts of each Spinner SVG */
  colors: {
    primary: string
    secondary: string
    third: string
    fourth: string
  }
}

export interface SpinnerSVGProps extends Omit<SpinnerProps, 'type'> {}

/**
 * The `Spinner` component gives you easy access to 5 common loading indicators for a better
 * user experience during network requests.
 *
 * @todo add transition to this component for smooth entry and exit
 *
 * @link https://maker-ui.com/docs/elements/spinner
 */
export const Spinner = (p: Partial<SpinnerProps>) => {
  const props = merge(defaults, p || {})

  switch (p.type) {
    case 'bars':
      return <Bars {...props} />
    case 'pulse':
      return <Pulse {...props} />
    case 'dot-spinner':
      return <DotSpinner {...props} />
    case 'blocks':
      return <Blocks {...props} />
    case 'dots':
      return <Dots {...props} />
    case 'gear':
      return <Gear {...props} />
    case 'basic':
    default:
      return <Basic {...props} />
  }
}

Spinner.displayName = 'Spinner'
