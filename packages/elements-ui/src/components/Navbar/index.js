import React from 'react'

import { useOptions, useOptionUpdater } from '../../context/OptionContext'
import { useTraceUpdate } from '../../config/prop-trace'

import Basic from './Basic'
import Split from './Split'
import Center from './Center'
import Reverse from './Reverse'
import Minimal from './Minimal'
import MinimalCenter from './MinimalCenter'
import MinimalLeft from './MinimalLeft'

export const Navbar = React.memo(({ type, ...props }) => {
  const { navigation } = useOptions()
  const setOptions = useOptionUpdater()

  if (type !== undefined && type !== navigation) {
    setOptions({ navigation: type })
  }

  useTraceUpdate(props)
  console.log('re-rendering navbar')

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
    case 'basic-left':
      return <Basic justify="space-between" {...props} />
    default:
      return <Basic {...props} />
  }
})
