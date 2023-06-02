import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { useLightbox } from './Provider'
import { PreviewIcon, PlayIcon, CloseIcon } from './Icons'

interface ToolbarProps {
  count?: boolean
  current?: number
  length?: number
  preview?: {
    show: boolean
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
  autoPlay?: {
    show: boolean
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
}

/**
 * The `Toolbar` component provides utility button options inside the lightbox.
 *
 * @internal
 */
export const Toolbar = ({ preview, autoPlay }: ToolbarProps) => {
  const { index, data, settings, toggleLightbox } = useLightbox()
  return (
    <div
      className="mkui-lbx-toolbar flex align-center"
      style={{
        justifyContent: data.length > 1 ? 'space-between' : 'flex-end',
      }}>
      {settings?.showCount && data.length > 1 && (
        <div className="mkui-lbx-pagination">
          {index + 1} / {data.length}
        </div>
      )}
      <div className="mkui-lbx-btn-group flex">
        {settings.showAutoPlay && data.length > 1 ? (
          <button
            className={cn([
              'mkui-lbx-btn btn-autoplay',
              autoPlay?.show ? 'active ' : '',
            ])}
            onClick={() => autoPlay?.set((a) => !a)}>
            <PlayIcon />
          </button>
        ) : null}
        {data.length > 1 ? (
          <button
            className={cn([
              'mkui-lbx-btn btn-preview',
              preview?.show ? 'active ' : '',
            ])}
            onClick={() => preview?.set((p) => !p)}>
            <PreviewIcon />
          </button>
        ) : null}
        <button
          className="mkui-lbx-btn btn-close"
          onClick={() => toggleLightbox()}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

Toolbar.displayName = 'LightboxToolbar'
