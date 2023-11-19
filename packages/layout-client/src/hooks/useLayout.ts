import { useContext } from 'react'
import type { Options } from '@maker-ui/layout-server'

import { LayoutContext } from '../components'

export const useLayout = () => {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  const {
    state: { options },
    dispatch,
  } = context

  function setOptions(newOptions: Partial<Options>) {
    dispatch({ type: 'SET_OPTIONS', value: newOptions })
  }

  return { options: options as Options, setOptions }
}
