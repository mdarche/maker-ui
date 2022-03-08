import type { SpringConfig } from '@react-spring/web'
import type { ModalProps } from '@maker-ui/elements'

import { LightboxContext, LightboxData } from './LightboxContext'
import { LightboxModal } from './LightboxModal'
import { LightboxLink } from './LightboxLink'

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
 * @link https://maker-ui.com/docs/elements/lightbox
 */

export const Lightbox = ({
  data,
  set,
  show,
  settings,
  css,
  children,
  background,
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
