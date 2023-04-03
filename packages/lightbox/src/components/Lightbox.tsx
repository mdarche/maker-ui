import * as React from 'react'

import { LightboxProvider } from './Provider'
import { LightboxModal } from './LightboxModal'
import { LightboxLink } from './Link'
import type { LightboxProps } from '@/types'

/**
 * The `Lightbox` component displays a modal lightbox gallery or detail view.
 *
 * @link https://maker-ui.com/docs/lightbox
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
    <LightboxProvider
      data={data}
      settings={settings || {}}
      show={show}
      set={set}>
      <LightboxModal {...props}>{children}</LightboxModal>
    </LightboxProvider>
  )
}

Lightbox.displayName = 'Lightbox'
Lightbox.Link = LightboxLink
