import { useContext } from 'react'
import type { Options } from '@maker-ui/layout-server'

import { LayoutContext } from '../components'

export const useLayout = () => {
  const {
    state: { options },
  } = useContext(LayoutContext)

  return { options: options as Options }
}
