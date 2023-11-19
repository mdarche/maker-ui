import * as React from 'react'
import type { MakerUIOptions, Options } from '@maker-ui/layout-server'
import { useLayout } from '../hooks'

export interface LayoutSettingsProps {
  options: MakerUIOptions
  children?: React.ReactNode
}

export const LayoutSettings = ({ options, children }: LayoutSettingsProps) => {
  const { setOptions } = useLayout()

  React.useEffect(() => {
    if (options) {
      setOptions(options as Partial<Options>)
    }
  }, [setOptions, options])

  return <>{children}</>
}
