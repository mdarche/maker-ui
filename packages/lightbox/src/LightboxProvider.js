import React, { useState, useContext } from 'react'

const LightboxContext = React.createContext()
const LightboxUpdateContext = React.createContext()

export const LightboxProvider = ({ children }) => {
  const [state, setState] = useState({
    index: 0,
    active: false,
    urls: [],
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
  const { active, index, urls } = useContext(LightboxContext)
  const setState = useContext(LightboxUpdateContext)

  if (typeof state === undefined) {
    throw new Error('useLightbox must be used within a Lightbox component')
  }

  function toggleLightbox(id) {
    if (id) {
      const current = urls.findIndex(i => i.id === id)
      return setState(s => ({ ...s, active: !s.active, index: current }))
    }
    return setState(s => ({ ...s, active: !s.active }))
  }

  function addToGallery(item) {
    if (Array.isArray(item)) {
      setState(s => ({ ...s, urls: item }))
    } else {
      const exists = urls ? urls.find(e => e.id === item.id) : false

      if (!exists) {
        setState(s => ({ ...s, urls: [...s.urls, item] }))
      }
    }
  }

  return { index, active, urls, toggleLightbox, addToGallery }
}
