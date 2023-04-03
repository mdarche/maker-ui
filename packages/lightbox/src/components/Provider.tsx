import React, { useEffect, useState } from 'react'
import { generateId, merge } from '@maker-ui/utils'
import type { SpinnerProps } from '@maker-ui/spinners'

import type { LightboxItem, LightboxProps, LightboxSettings } from '@/types'

interface LightboxContextProps {
  data?: LightboxItem[]
  settings: LightboxSettings
  show?: boolean
  set?: LightboxProps['set']
  children: React.ReactNode
}

interface LightboxState {
  index: number
  active: boolean
  data: LightboxItem[]
  settings: LightboxSettings
  set: LightboxProps['set']
}

const videoFormats = ['.mp4', '.ogg', '.webm']

const LightboxContext = React.createContext<{
  state: Partial<LightboxState>
  setState: React.Dispatch<React.SetStateAction<LightboxState>>
}>({ state: {}, setState: () => {} })

/**
 * The `LightboxContext` component is a Provider that handles stores all of the data
 * for a lightbox gallery.
 *
 * @todo combine this with lightbox component and simplify
 *
 * @internal
 */
export const LightboxProvider = ({
  data = [],
  settings = {},
  show,
  set,
  children,
}: LightboxContextProps) => {
  const [state, setState] = useState<LightboxState>({
    index: 0,
    active: false,
    data: data.map((i) => formatItem(i)),
    settings: mergeSettings(settings),
    set,
  })

  useEffect(() => {
    if (show) {
      setState((s) => ({ ...s, active: show }))
    }
  }, [show])

  return (
    <LightboxContext.Provider value={{ state, setState }}>
      {children}
    </LightboxContext.Provider>
  )
}

LightboxProvider.displayName = 'LightboxProvider'

/**
 * React hook that registers all lightbox links and data as well as control
 * of the lightbox state.
 *
 * @internal
 */
export function useLightbox(): any {
  const {
    state: { active, index, data, settings, set },
    setState,
  } = React.useContext(LightboxContext)

  if (typeof data === undefined) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  /**
   * Accepts an option `ID` string and opens or closes the lightbox modal
   */
  function toggleLightbox(id?: string) {
    if (id && data) {
      const current = data.findIndex((i) => i.id === id)
      return setState((s) => ({ ...s, active: !s.active, index: current }))
    }
    return set ? set(false) : setState((s) => ({ ...s, active: false }))
  }

  /**
   * Registers a `LightboxItem` object to the Lightbox context
   */
  function addToGallery(item: LightboxItem) {
    const exists = data
      ? data.find((e: LightboxItem) => e.id === item.id)
      : false

    if (!exists) {
      setState((s) => ({ ...s, data: [...s.data, formatItem(item)] }))
    }
  }

  function setIndex(type: 'previous' | 'next' | 'index', index?: number) {
    setState((s) => {
      if (type === 'index' && index) {
        return { ...s, index }
      }
      const next = s.index === s.data.length - 1 ? 0 : s.index + 1
      const prev = s.index === 0 ? s.data.length - 1 : s.index - 1

      return { ...s, index: type === 'previous' ? prev : next }
    })
  }

  return {
    index,
    active,
    data,
    settings,
    toggleLightbox,
    addToGallery,
    setIndex,
  }
}

/**
 * Utility that formats LightboxLink prop data and assigns an ID
 */
function formatItem(original: LightboxItem) {
  return merge(
    {
      id: generateId(),
      src: null,
      alt: original.alt || original.title || 'Lightbox media',
      title: null,
      description: null,
      youtubeId: null,
      vimeoId: null,
      poster: null,
      htmlVideo: original.src
        ? videoFormats.some((v) => original.src?.includes(v))
        : false,
    },
    original
  )
}

/**
 * Utility that merges user settings with `Lightbox` defaults.
 */
function mergeSettings(settings: LightboxSettings) {
  return merge(
    {
      closeOnBlur: true,
      customArrow: undefined,
      showInfo: true,
      showCount: true,
      showZoom: false,
      showAutoPlay: true,
      autoPlayDuration: 6000,
      disableHideControls: false,
      spinnerType: 'dots' as SpinnerProps['type'],
    },
    settings as object
  )
}
