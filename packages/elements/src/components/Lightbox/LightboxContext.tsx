import * as React from 'react'
import merge from 'deepmerge'
import { generateId } from 'maker-ui'

import { LightboxProps } from './Lightbox'

export interface LightboxData {
  id?: string
  src?: string
  alt?: string
  title?: string
  description?: string
  youtubeId?: string
  htmlVideo?: boolean
  vimeoId?: string
  poster?: string
}

interface LightboxContextProps {
  data?: LightboxData[]
  settings: LightboxProps['settings']
  show?: boolean
  set?: LightboxProps['set']
  children: React.ReactNode
}

interface LightboxState {
  index: number
  active: boolean
  data: LightboxData[]
  settings: LightboxProps['settings']
  set: LightboxProps['set']
}

const videoFormats = ['.mp4', '.ogg', '.webm']

const LightboxDataContext = React.createContext<Partial<LightboxState>>({})
const LightboxUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<LightboxState>>
>(() => {})

/**
 * The `LightboxContext` component is a Provider that handles stores all of the data
 * for a lightbox gallery.
 *
 * @internal usage only
 */

export const LightboxContext = ({
  data = [],
  settings = {},
  show,
  set,
  children,
}: LightboxContextProps) => {
  const [state, setState] = React.useState<LightboxState>({
    index: 0,
    active: false,
    data: data.map(i => formatData(i)),
    settings: mergeSettings(settings),
    set,
  })

  React.useEffect(() => {
    if (show) {
      setState(s => ({ ...s, active: show }))
    }
  }, [show])

  return (
    <LightboxDataContext.Provider value={state}>
      <LightboxUpdateContext.Provider value={setState}>
        {children}
      </LightboxUpdateContext.Provider>
    </LightboxDataContext.Provider>
  )
}

LightboxContext.displayName = 'LightboxContext'

/**
 * React hook that registers all lightbox links and data as well as control
 * of the lightbox state.
 *
 * @internal usage only
 */

export function useLightbox(): any {
  const { active, index, data, settings, set } = React.useContext(
    LightboxDataContext
  )
  const setState = React.useContext(LightboxUpdateContext)

  if (typeof data === undefined) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  /**
   * Accepts an option `ID` string and opens or closes the lightbox modal
   */

  function toggleLightbox(id?: string) {
    if (id && data) {
      const current = data.findIndex(i => i.id === id)
      return setState(s => ({ ...s, active: !s.active, index: current }))
    }
    return set ? set(false) : setState(s => ({ ...s, active: false }))
  }

  /**
   * Registers a `LightboxData` object to the Lightbox context
   */

  function addToGallery(item: LightboxData) {
    const exists = data
      ? data.find((e: LightboxData) => e.id === item.id)
      : false

    if (!exists) {
      setState(s => ({ ...s, data: [...s.data, formatData(item)] }))
    }
  }

  function setIndex(type: 'previous' | 'next' | 'index', index?: number) {
    setState(s => {
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

function formatData(original: LightboxData) {
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
        ? videoFormats.some(v => original.src?.includes(v))
        : false,
    },
    original
  )
}

/**
 * Utility that merges user settings with `Lightbox` defaults.
 */

function mergeSettings(settings: LightboxProps['settings']) {
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
    },
    settings as object
  )
}
