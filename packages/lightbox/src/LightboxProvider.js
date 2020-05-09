import React, { useState, useContext, useCallback } from 'react'
import merge from 'deepmerge'
import { generateId } from 'maker-ui'

const videoFormats = ['.mp4', '.ogg', '.webm']

function formatData(original) {
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

const LightboxContext = React.createContext()
const LightboxUpdateContext = React.createContext()

export const LightboxProvider = ({ data = [], children }) => {
  const [state, setState] = useState({
    index: 0,
    active: false,
    data: data.map(i => formatData(i)),
  })

  return (
    <LightboxContext.Provider value={state}>
      <LightboxUpdateContext.Provider value={setState}>
        {children}
      </LightboxUpdateContext.Provider>
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const { active, index, data } = useContext(LightboxContext)
  const setState = useContext(LightboxUpdateContext)

  if (typeof state === undefined) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  function toggleLightbox(id) {
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
