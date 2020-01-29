import React from 'react'

import { useOptions, useOptionUpdater } from '../../context/OptionContext'
import Basic from './Basic'
import BasicCenter from './BasicCenter'
import Split from './Split'
import Center from './Center'
import Reverse from './Reverse'
import Minimal from './Minimal'
import MinimalCenter from './MinimalCenter'
import MinimalLeft from './MinimalLeft'

export const Navbar = ({ type, ...props }) => {
  const { navigation } = useOptions()
  const setOptions = useOptionUpdater()

  if (type !== undefined && type !== navigation) {
    setOptions({ navigation: type })
  }

  switch (navigation) {
    case 'split':
      return <Split {...props} />
    case 'center':
      return <Center {...props} />
    case 'reverse':
      return <Reverse {...props} />
    case 'minimal':
      return <Minimal {...props} />
    case 'minimal-center':
      return <MinimalCenter {...props} />
    case 'minimal-left':
      return <MinimalLeft {...props} />
    case 'basic-center':
      return <BasicCenter {...props} />
    default:
      return <Basic {...props} />
  }
}
