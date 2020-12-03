import * as React from 'react'

import { MakerOptions, MakerProps, ResponsiveScale } from '../types'
import { useOptions } from '../../context/OptionContext'
import { MenuProps } from '../Menu'
import { Basic, Center, Reverse, Minimal, Split } from './Presets'
import { useLayout } from '../../context/LayoutContext'

export interface NavProps extends MakerProps {
  logo?: React.ReactNode
  menu?: MenuProps[]
  colorButton?: MakerOptions['header']['colorButton']
  menuButton?: MakerOptions['header']['menuButton']
  widgetArea?: React.ReactNode
  header?: MakerOptions['header']
  bp?: MakerOptions['header']['breakIndex']
  columnsDesktop?: MakerOptions['header']['columnsDesktop']
  columnsMobile?: MakerOptions['header']['columnsMobile']
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

  const attributes = {
    type: layout as NavProps['type'],
    bp: header.breakIndex,
    columnsDesktop: header.columnsDesktop,
    columnsMobile: header.columnsMobile,
    ...props,
  }

  switch (layout) {
    case 'center':
      return <Center {...attributes} />
    case 'split':
      return <Split {...attributes} />
    case 'minimal':
      return <Minimal {...attributes} />
    case 'minimal-left':
      return <Minimal {...attributes} />
    case 'minimal-center':
      return <Minimal {...attributes} />
    case 'reverse':
      return <Reverse {...attributes} />
    case 'basic-left':
      return <Basic {...attributes} />
    case 'basic':
    default:
      return <Basic {...attributes} />
  }
}

Navbar.displayName = 'Navbar'
