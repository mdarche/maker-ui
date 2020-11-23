import React, { useState, useContext } from 'react'
import merge from 'deepmerge'
import { generateId } from 'maker-ui'

const videoFormats = ['.mp4', '.ogg', '.webm']

const LightboxDataContext = React.createContext(null)
const LightboxUpdateContext = React.createContext(null)

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
        ? videoFormats.some(v => original.src.includes(v))
        : false,
    },
    original
  )
}

export interface LightboxData {
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
  data: LightboxData[]
  children: React.ReactElement
}

interface LightboxState {
  index: number
  active: boolean
  data: LightboxData[]
}

/**
 * The `LightboxContext` component is a Provider that handles stores all of the data
 * for a lightbox gallery.
 *
 * @internal usage only
 */

export const LightboxContext = ({
  data = [],
  children,
}: LightboxContextProps) => {
  const [state, setState] = useState<LightboxState>({
    index: 0,
    active: false,
    data: data.map(i => formatData(i)),
  })

  return (
    <LightboxDataContext.Provider value={state}>
      <LightboxUpdateContext.Provider value={setState}>
        {children}
      </LightboxUpdateContext.Provider>
    </LightboxDataContext.Provider>
  )
}

export function useLightbox() {
  const { active, index, data } = useContext(LightboxDataContext)
  const setState = useContext(LightboxUpdateContext)

  if (typeof data === undefined) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  function toggleLightbox(id?: string) {
    if (id) {
      const current = data.findIndex(i => i.id === id)
      return setState(s => ({ ...s, active: !s.active, index: current }))
    }
    return setState(s => ({ ...s, active: !s.active }))
  }

  function addToGallery(item) {
    const exists = data ? data.find(e => e.id === item.id) : false

    if (!exists) {
      setState(s => ({ ...s, data: [...s.data, formatData(item)] }))
    }
  }

  return { index, active, data, toggleLightbox, addToGallery }
}
