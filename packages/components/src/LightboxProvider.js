import React, { useState, useContext } from 'react'

const LightboxContext = React.createContext()
const LightboxUpdateContext = React.createContext()

export const LightboxProvider = ({ children }) => {
  const [state, setState] = useState({
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
  const { active, urls } = useContext(LightboxContext)
  const setState = useContext(LightboxUpdateContext)

  if (typeof state === undefined) {
    throw new Error('BoxItem must be used within an Lightbox component')
  }

  function toggleLightbox() {
    console.log('works', active)
    setState(s => ({ ...s, active: !s.active }))
  }

  function addToGallery(item) {
    const exists = urls.find(e => e.src === item.src)

    if (!exists) {
      setState(s => ({ ...s }))
    }
  }

  return { active, toggleLightbox, addToGallery }

  // return { state, toggleLightbox, addToGallery }
}
