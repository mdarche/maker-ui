import React, { useRef, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import type { StaticImageData } from 'next/image'

import { useLightbox } from './Provider'
import type { LightboxItem } from '@/types'
import Image from 'next/image'

interface PreviewProps {
  show?: boolean
}

function isStaticImageData(data: any): data is StaticImageData {
  return data !== null && typeof data === 'object' && 'src' in data
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
    if (i.youtubeId || i.vimeoId || i.htmlVideo || typeof i.src !== 'string') {
      // TODO - add play button back
      return { backgroundColor: '#000' }
    }
    return i.src ? { backgroundImage: `url('${i.src}')` } : {}
  }

  return (
    <div ref={ref} className={cn(['mkui-lbx-preview', show ? 'active ' : ''])}>
      {data?.map((item: LightboxItem, i: number) => {
        const isImage = isStaticImageData(item.src)
        return (
          <button
            key={i}
            title={item.title}
            onClick={() => handleClick(i)}
            style={isImage ? undefined : getBackground(item)}
            className={cn([
              'mkui-lbx-btn-item relative',
              i === index ? 'active' : undefined,
            ])}>
            {isImage && item.src ? (
              <Image
                fill
                src={item.src}
                placeholder="blur"
                alt={item.alt || 'preview'}
                style={{ objectFit: 'cover' }}
                sizes="150px"
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

Preview.displayName = 'LightboxPreview'
