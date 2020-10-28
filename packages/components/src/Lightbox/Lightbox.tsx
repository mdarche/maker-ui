import React, { useEffect } from 'react'

import { LightboxContext, LightboxData } from './LightboxContext'
import { LightboxModal } from './LightboxModal'
import { LightboxLink } from './LightboxLink'
import { ModalProps } from '../Modal'

interface LightboxProps extends ModalProps {
  id?: string
  data?: LightboxData[]
  children?: any
}

/**
 * Use the `Lightbox` component to show and customize a lightbox gallery or detail view.
 *
 * @see https://maker-ui.com/docs/components/lightbox
 */

export const Lightbox = ({
  data,
  id,
  toggle,
  show,
  children,
  ...props
}: LightboxProps) => {
  useEffect(() => {
    if (!show && toggle !== undefined) {
      return () => {
        toggle(false)
      }
    }
  }, [toggle, show])

  return (
    <LightboxContext data={data}>
      <LightboxModal id={id} show={show} data={data} {...props}>
        {children}
      </LightboxModal>
    </LightboxContext>
  )
}

Lightbox.Link = LightboxLink
