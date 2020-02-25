import React from 'react'

import { useOptions, useOptionUpdater } from '../../context/OptionContext'

import Basic from './Basic'
import Center from './Center'
import Reverse from './Reverse'
import Minimal from './Minimal'

const Navbar = React.memo(({ type, ...props }) => {
  const { navigation, header } = useOptions()
  const setOptions = useOptionUpdater()

  if (type !== undefined && type !== navigation) {
    setOptions({ navigation: type })
  }

  switch (navigation) {
    case 'center':
      return <Center type={1} {...props} bp={header.breakIndex} />
    case 'split':
      return <Center type={2} {...props} bp={header.breakIndex} />
    case 'reverse':
      return <Reverse {...props} />
    case 'minimal':
      return <Minimal type={1} {...props} />
    case 'minimal-left':
      return <Minimal type={2} {...props} />
    case 'minimal-center':
      return <Minimal type={3} {...props} />
    case 'basic-left':
      return <Basic type={2} {...props} bp={header.breakIndex} />
    default:
      return <Basic {...props} />
  }
})

export default Navbar
