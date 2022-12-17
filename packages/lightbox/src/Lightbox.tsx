import * as React from 'react'
import type { ModalProps } from '@maker-ui/modal'

import { LightboxContext, LightboxData } from './LightboxContext'
import { LightboxModal } from './LightboxModal'
import { LightboxLink } from './LightboxLink'
import { SpinnerProps } from '@maker-ui/spinners'

export interface LightboxProps
  extends Omit<ModalProps, 'closeOnBlur' | 'center' | 'appendTo'> {
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
    spinnerType?: SpinnerProps['type']
  }
}

/**
 * The `Lightbox` component displays a modal lightbox gallery or detail view.
 *
 * @link https://maker-ui.com/docs/elements/lightbox
 */

export const Lightbox = ({
  data,
  set,
  show,
  settings,
  children,
  background,
  ...props
}: LightboxProps) => {
  return (
    <LightboxContext data={data} settings={settings} show={show} set={set}>
      <LightboxModal {...props}>{children}</LightboxModal>
    </LightboxContext>
  )
}

Lightbox.displayName = 'Lightbox'
Lightbox.Link = LightboxLink
