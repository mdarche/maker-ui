import * as React from 'react'

import {
  MaybeElement,
  MakerOptions,
  MakerProps,
  ResponsiveScale,
} from '../types'
import { useOptions, useOptionUpdater } from '../../context/OptionContext'
import { MenuProps } from '../Menu'
import { Basic, Center, Reverse, Minimal } from './Presets'

/**
 * Alias for shared <Navbar /> component props.
 */
export interface NavProps extends MakerProps {
  logo?: MaybeElement
  menuToggle?: MaybeElement
  colorToggle?: MaybeElement
  widgetArea?: MaybeElement
  menu?: MenuProps[]
  header?: MakerOptions['header']
  bp?: number
  type?: string
  layout?: number
  pathname?: string
  maxWidth?: ResponsiveScale | any
  variant?: string
}

/**
 * Use the `Navbar` component to render your layout's primary navigation.
 *
 * Offers 8 different layout options that can be selected via `type` prop
 * or your layout's `options` configuration.
 * @see https://maker-ui.com/components/navbar
 */

export const Navbar = React.memo(({ type, ...props }: NavProps) => {
  const { navigation, header } = useOptions()
  const setOptions = useOptionUpdater()

  if (type !== undefined && type !== navigation) {
    setOptions({ navigation: type })
  }

  switch (navigation) {
    case 'center':
      return <Center layout={1} {...props} bp={header.breakIndex} />
    case 'split':
      return <Center layout={2} {...props} bp={header.breakIndex} />
    case 'reverse':
      return <Reverse {...props} />
    case 'minimal':
      return <Minimal layout={1} {...props} />
    case 'minimal-left':
      return <Minimal layout={2} {...props} />
    case 'minimal-center':
      return <Minimal layout={3} {...props} />
    case 'basic-left':
      return <Basic layout={2} {...props} bp={header.breakIndex} />
    default:
      return <Basic {...props} />
  }
})

Navbar.displayName = 'Navbar_MakerUI'
