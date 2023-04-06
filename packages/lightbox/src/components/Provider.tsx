import React, { useEffect, useState } from 'react'
import { generateId, merge } from '@maker-ui/utils'
import type { SpinnerProps } from '@maker-ui/spinners'

import type { LightboxItem, LightboxProps, LightboxSettings } from '@/types'

interface LightboxState {
  /** The active index. */
  index: number
  /** Whether or not the modal is currently active. */
  active: boolean
  /** All LightboxItem data for this instance of the Lightbox. */
  data: LightboxItem[]
  /** All settings for controlling various UI components of the Lightbox. */
  settings: LightboxSettings
}

function dedupeById(array: LightboxItem[]) {
  const idSet = new Set<string>()
  const result = []

  for (const item of array) {
    const id = item.id!
    if (!idSet.has(id)) {
      idSet.add(id)
      result.push(item)
    }
  }

  return result
}

const videoFormats = ['.mp4', '.ogg', '.webm']

const LightboxContext = React.createContext<{
  state: Partial<LightboxState>
  setState: React.Dispatch<React.SetStateAction<LightboxState>>
}>({ state: {}, setState: () => {} })

/**
 * The `LightboxProvider` component is a Provider that handles stores all of the data
 * for a lightbox gallery.
 *
 * @internal
 */
export const LightboxProvider = ({
  data = [],
  settings = {},
  show,
  set,
  children,
}: LightboxProps) => {
  const [state, setState] = useState<LightboxState>({
    index: 0,
    active: false,
    data: data.map((i) => formatItem(i)),
    settings: mergeSettings(settings),
  })

  /**
   * Dedupe state.data if using the LightboxLink method
   */
  useEffect(() => {
    if (!data.length && state.data.length) {
      const deduped = dedupeById(state.data)
      if (deduped.length !== state.data.length) {
        setState((s) => ({ ...s, data: deduped }))
      }
    }
  }, [state.data])

  /**
   * Handle external `show` prop
   */
  useEffect(() => {
    if (show) {
      setState((s) => ({ ...s, active: show }))
    }
  }, [show])

  /**
   * Handle external `set` prop
   */
  useEffect(() => {
    if (set) {
      set(state.active)
    }
  }, [state.active])

  return (
    <LightboxContext.Provider value={{ state, setState }}>
      {children}
    </LightboxContext.Provider>
  )
}

LightboxProvider.displayName = 'LightboxProvider'

/**
 * React hook that registers all LightboxLink data as well as controlling the
 * Lightbox visibility.
 *
 * @internal
 */
export function useLightbox() {
  const { state, setState } = React.useContext(LightboxContext)

  if (typeof state === undefined) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  /**
   * Accepts an option `ID` string and opens or closes the lightbox modal
   */
  function toggleLightbox(id?: string) {
    if (id && state.data) {
      const current = state.data.findIndex((i) => i.id === id)
      return setState((s) => ({ ...s, active: !s.active, index: current }))
    }
    return setState((s) => ({ ...s, active: false }))
  }

  /**
   * Registers a `LightboxItem` object to the Lightbox context
   */
  function registerItem(item: LightboxItem) {
    const exists = state.data
      ? state.data.find(({ id }: LightboxItem) => id === item.id)
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
    index: state.index,
    active: state.active,
    data: state.data,
    settings: state.settings,
    toggleLightbox,
    registerItem,
    setIndex,
  } as {
    index: number
    active: boolean
    data: LightboxItem[]
    settings: LightboxSettings
    toggleLightbox: (id?: string) => void
    registerItem: (item: LightboxItem) => void
    setIndex: (type: 'previous' | 'next' | 'index', index?: number) => void
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
      nextImage: true,
      spinnerType: 'dots' as SpinnerProps['type'],
    },
    settings as object
  )
}
