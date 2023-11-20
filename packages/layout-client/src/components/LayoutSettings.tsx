import * as React from 'react'
import type { MakerUIOptions, Options } from '@maker-ui/layout-server'
import { useLayout } from '../hooks'

export interface LayoutSettingsProps {
  options: MakerUIOptions
  children?: React.ReactNode
  _type?: 'settings'
}

export const LayoutSettings = ({
  options,
  children,
  _type = 'settings',
}: LayoutSettingsProps) => {
  const { setOptions } = useLayout()

  React.useEffect(() => {
    if (options) {
      setOptions(options as Partial<Options>)
      // TODO Update style tag in header if necessary
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return <>{children}</>
}

LayoutSettings.displayName = 'LayoutSettings'
