import * as React from 'react'

import {
  MaybeElement,
  MakerOptions,
  MakerProps,
  ResponsiveScale,
} from '../types'
import { useOptions } from '../../context/OptionContext'
import { MenuProps } from '../Menu'
import { Basic, Center, Reverse, Minimal } from './Presets'
import { useLayout } from '../../context/LayoutContext'

export interface NavProps extends MakerProps {
  logo?: MaybeElement
  menu?: MenuProps[]
  menuButtonInner?: MaybeElement
  customMenuButton?(isOpen?: boolean, attributes?: object): React.ReactElement
  colorButtonInner?: MaybeElement
  customColorButton?(
    colorMode?: string,
    attributes?: object
  ): React.ReactElement
  widgetArea?: MaybeElement
  header?: MakerOptions['header']
  bp?: number
  type?: MakerOptions['header']['navType']
  layout?: number
  pathname?: string
  maxWidth?: ResponsiveScale | any
}

/**
 * The `Navbar` component renders your layout's primary navigation in one of
 * 8 conventional styles.
 *
 * @see https://maker-ui.com/components/layout/navbar
 */

export const Navbar = (props: NavProps) => {
  const { header } = useOptions()
  const [layout, setLayout] = useLayout('nav')

  if (props.type !== undefined && props.type !== layout) {
    setLayout(props.type)
  }

  switch (layout) {
    case 'center':
      return <Center layout={1} {...props} bp={header.breakIndex} />
    case 'split':
      return <Center layout={2} {...props} bp={header.breakIndex} />
    case 'minimal':
      return <Minimal layout={1} {...props} />
    case 'minimal-left':
      return <Minimal layout={2} {...props} />
    case 'minimal-center':
      return <Minimal layout={3} {...props} />
    case 'reverse':
      return <Reverse {...props} />
    case 'basic-left':
      return <Basic layout={2} {...props} bp={header.breakIndex} />
    case 'basic':
    default:
      return <Basic {...props} />
  }
}

Navbar.displayName = 'Navbar'
