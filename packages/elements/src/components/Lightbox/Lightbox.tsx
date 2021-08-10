import * as React from 'react'
import { SpringConfig } from '@react-spring/web'

import { LightboxContext, LightboxData } from './LightboxContext'
import { LightboxModal } from './LightboxModal'
import { LightboxLink } from './LightboxLink'
import { ModalProps } from '../Modal'

export interface LightboxProps
  extends Omit<
    ModalProps,
    'closeOnBlur' | 'center' | 'appendTo' | 'springConfig'
  > {
  id?: string
  data?: LightboxData[]
  settings?: {
    closeOnBlur?: boolean
    showInfo?: boolean
    showCount?: boolean
    showZoom?: boolean // TODO
    showAutoPlay?: boolean
    autoPlayDuration?: number
    disableHideControls?: boolean
    springConfig?: SpringConfig
  }
}

/**
 * The `Lightbox` component displays a modal lightbox gallery or detail view.
 *
 * @link https://maker-ui.com/docs/components/lightbox
 */

export const Lightbox = ({
  data,
  set,
  show,
  settings,
  css,
  children,
  ...props
}: LightboxProps) => {
  return (
    <LightboxContext data={data} settings={settings} show={show} set={set}>
      <LightboxModal css={{ ...(css as object) }} {...props}>
        {children}
      </LightboxModal>
    </LightboxContext>
  )
}

Lightbox.displayName = 'Lightbox'
Lightbox.Link = LightboxLink
