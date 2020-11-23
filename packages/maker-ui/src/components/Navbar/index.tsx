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

  React.useEffect(() => {
    if (props.type !== undefined && props.type !== layout) {
      setLayout(props.type)
    }
  }, [props.type, layout, setLayout])

  switch (layout) {
    case 'center':
      return <Center {...props} bp={header.breakIndex} />
    case 'split':
      return <Center {...props} bp={header.breakIndex} />
    case 'minimal':
      return <Minimal {...props} />
    case 'minimal-left':
      return <Minimal {...props} />
    case 'minimal-center':
      return <Minimal {...props} />
    case 'reverse':
      return <Reverse {...props} />
    case 'basic-left':
      return <Basic {...props} bp={header.breakIndex} />
    case 'basic':
    default:
      return <Basic {...props} bp={header.breakIndex} />
  }
}

Navbar.displayName = 'Navbar'
