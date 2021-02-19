import * as React from 'react'
import merge from 'deepmerge'

import { MakerOptions, MakerUIOptions } from '../types'
import { defaultOptions } from '../options'

interface OptionProviderProps {
  options: Partial<MakerOptions>
  children: React.ReactNode
}

export const OptionContext = React.createContext<Partial<MakerOptions>>({})
const OptionUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<MakerOptions>>
>(() => {})

function mergeOptions(initial: MakerUIOptions, incoming: MakerUIOptions) {
  return merge(initial, incoming, {
    arrayMerge: (_, source, __) => source,
  }) as MakerOptions
}

/**
 * The `OptionProvider` stores all of Maker UI's client-facing
 * configurations.
 *
 * @internal usage only
 */

const OptionProvider = ({ options = {}, children }: OptionProviderProps) => {
  const [state, setState] = React.useState<MakerOptions>(
    mergeOptions(defaultOptions, options)
  )

  React.useEffect(() => {
    setState(s => mergeOptions(s, options))
  }, [options])

  return (
    <OptionContext.Provider value={state}>
      <OptionUpdateContext.Provider value={setState}>
        {children}
      </OptionUpdateContext.Provider>
    </OptionContext.Provider>
  )
}

/**
 * Retrieves the current Maker UI options configuration.
 *
 * @link https://maker-ui.com/hooks/#useOptions
 */

function useOptions(): MakerOptions {
  const options: Partial<MakerOptions> = React.useContext(OptionContext)

  if (options === undefined) {
    throw new Error(
      'useOptions must be used within an Maker UI Layout component'
    )
  }

  return options as MakerOptions
}

/**
 * Allows you to update the current Maker UI options configuration.
 *
 * @link https://maker-ui.com/hooks/#useOptionsUpdater
 */

function useOptionsUpdater() {
  const dispatch = React.useContext(OptionUpdateContext)

  if (dispatch === undefined) {
    throw new Error(
      'useOptionsUpdater must be used within an Maker UI Layout component'
    )
  }

  function setOptions(options: Partial<MakerOptions>) {
    dispatch(state => merge(state, options))
  }

  return setOptions
}

export { OptionProvider, useOptions, useOptionsUpdater }
