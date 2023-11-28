import * as React from 'react'
// Spinners
import { Bars } from './Bars'
import { Basic } from './Basic'
import { Blocks } from './Blocks'
import { Dots } from './Dots'
import { DotSpinner } from './DotSpinner'
import { Gear } from './Gear'
import { Pulse } from './Pulse'
import { Classic } from './Classic'

const defaultColors = ['#0e94d4', '#58c5fa', '#9ad8f6', '#d2d2d2']

export interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  /** All prebuilt spinner types */
  type:
    | 'default'
    | 'classic'
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
  size?: number
  /** An array of colors that is applied to various parts of each Spinner SVG */
  colors: string[] | string
}

export interface SpinnerSVGProps extends Omit<SpinnerProps, 'type'> {}

/**
 * The `Spinner` component gives you easy access to common loading indicators for a better
 * user experience during network requests.
 *
 * @link https://maker-ui.com/docs/elements/spinner
 */
export const Spinner = (p: Partial<SpinnerProps>) => {
  const colors =
    typeof p.colors === 'string' ? new Array(4).fill(p.colors) : p.colors
  const props = {
    ...p,
    type: p.type || 'default',
    colors: colors || defaultColors,
    size: p.size || 80,
  }

  switch (p.type) {
    case 'bars':
      return <Bars {...props} />
    case 'classic':
      return <Classic {...props} />
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
