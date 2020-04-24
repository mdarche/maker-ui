import React, { useEffect } from 'react'

import { LightboxProvider } from './LightboxProvider'
import LightboxModal from './LightboxModal'
import Link from './Link'

const Lightbox = ({ data, toggle, show, children, ...props }) => {
  useEffect(() => {
    if (!show && toggle !== undefined) {
      return () => {
        toggle(false)
      }
    }
  }, [toggle, show])

  return (
    <LightboxProvider data={data}>
      <LightboxModal show={show} {...props}>
        {children}
      </LightboxModal>
    </LightboxProvider>
  )
}

Lightbox.Link = Link

export default Lightbox
