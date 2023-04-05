import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { useLightbox } from './Provider'
import { ZoomIcon, PreviewIcon, PlayIcon, CloseIcon } from './Icons'

interface ToolbarProps {
  count?: boolean
  current?: number
  length?: number
  preview?: {
    show: boolean
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
  zoom?: {
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
export const Toolbar = ({ preview, zoom, autoPlay }: ToolbarProps) => {
  const { index, data, settings, toggleLightbox } = useLightbox()
  return (
    <div
      className="mkui-lightbox-toolbar flex align-center"
      style={{
        justifyContent: data.length > 1 ? 'space-between' : 'flex-end',
      }}>
      {settings?.showCount && data.length > 1 && (
        <div className="mkui-lightbox-pagination">
          {index + 1} / {data.length}
        </div>
      )}
      <div className="mkui-lightbox-btn-group flex">
        {zoom?.show ? (
          <button
            className="mkui-lightbox-btn btn-zoom"
            disabled={
              data[index].src && !data[index].htmlVideo ? true : undefined
            }
            onClick={() => zoom?.set((z) => !z)}>
            <ZoomIcon style={{ height: 18 }} />
          </button>
        ) : null}
        {settings.showAutoPlay && data.length > 1 ? (
          <button
            className={cn([
              'mkui-lightbox-btn btn-autoplay',
              autoPlay?.show ? 'active ' : '',
            ])}
            onClick={() => autoPlay?.set((a) => !a)}>
            <PlayIcon style={{ height: 24 }} />
          </button>
        ) : null}
        {data.length > 1 ? (
          <button
            className={cn([
              'mkui-lightbox-btn btn-preview',
              preview?.show ? 'active ' : '',
            ])}
            onClick={() => preview?.set((p) => !p)}>
            <PreviewIcon style={{ height: 21 }} />
          </button>
        ) : null}
        <button
          className="mkui-lightbox-btn btn-close"
          onClick={() => toggleLightbox()}>
          <CloseIcon style={{ height: 24 }} />
        </button>
      </div>
    </div>
  )
}

Toolbar.displayName = 'LightboxToolbar'
