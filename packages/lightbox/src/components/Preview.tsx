import React, { useRef, useEffect } from 'react'
import { cn } from '@maker-ui/utils'

import { useLightbox } from './Provider'
import type { LightboxItem } from '@/types'

interface PreviewProps {
  show?: boolean
}

/**
 * The `Preview` component shows additional gallery items while the Lightbox modal
 * is active.
 *
 * @internal
 */
export const Preview = ({ show }: PreviewProps) => {
  const ref = useRef<any>(null)
  const { index, data, setIndex } = useLightbox()

  const handleClick = (i: number) => setIndex('index', i)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        ref.current.querySelector('button').focus()
      }, 100)
    }
  }, [show])

  const getBackground = (i: LightboxItem) => {
    if (i.youtubeId || i.vimeoId || i.htmlVideo) {
      // TODO - add play button back
      return { backgroundColor: '#000' }
    }
    return i.src ? { backgroundImage: `url('${i.src}')` } : {}
  }

  return (
    <div
      ref={ref}
      className={cn(['mkui-lightbox-preview', show ? 'active ' : ''])}>
      {data?.map((item: LightboxItem, i: number) => (
        <button
          key={i}
          title={item.title}
          onClick={() => handleClick(i)}
          style={getBackground(item)}
          className={cn([
            'mkui-lightbox-btn-item',
            i === index ? 'active' : undefined,
          ])}
        />
      ))}
    </div>
  )
}

Preview.displayName = 'LightboxPreview'
