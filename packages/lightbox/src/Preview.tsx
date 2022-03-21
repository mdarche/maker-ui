import * as React from 'react'
import { Grid, Button } from '@maker-ui/primitives'

import { useLightbox, LightboxData } from './LightboxContext'

interface PreviewProps {
  show?: boolean
}

/**
 * The `Preview` component shows additional gallery items while the lightbox view
 * is active.
 *
 * @internal
 */
export const Preview = ({ show }: PreviewProps) => {
  const ref = React.useRef<any>(null)
  const { index, data, setIndex } = useLightbox()

  const handleClick = (i: number) => setIndex('index', i)

  React.useEffect(() => {
    if (show) {
      setTimeout(() => {
        ref.current.querySelector('button').focus()
      }, 100)
    }
  }, [show])

  const getBackground = (i: LightboxData) => {
    if (i.youtubeId || i.vimeoId || i.htmlVideo) {
      // TODO - add play button back
      return {
        // background: `url(${playIcon})`,
        backgroundColor: '#000',
      }
    }
    if (i.src) {
      return {
        background: `url('${i.src}')`,
        backgroundSize: 'cover',
      }
    }

    return null
  }

  return (
    <Grid
      ref={ref}
      columns={['repeat(auto-fill, minmax(100px, 1fr))']}
      gap={20}
      className={`${show ? 'active ' : ''}lb-preview`}
      css={{
        position: ['fixed'],
        padding: 20,
        bg: ['rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 0.66)'],
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '85vh',
        overflow: 'scroll',
        transform: 'translateY(100%)',
        opacity: 0,
        visibility: 'hidden',
        willChange: 'opacity, transform',
        transition: 'all ease .3s',
        zIndex: 100,
        '&.active': {
          transform: 'translateY(0)',
          visibility: 'visible',
          opacity: 1,
        },
      }}>
      {data.map((item: LightboxData, i: number) => (
        <Button
          key={i}
          title={item.title}
          onClick={() => handleClick(i)}
          className={i === index ? 'preview-active' : undefined}
          css={{
            cursor: 'pointer',
            height: 80,
            borderColor: '#ababab',
            ...getBackground(item),
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            '&.preview-active': {
              outline: '2px solid #fff',
            },
          }}
        />
      ))}
    </Grid>
  )
}

Preview.displayName = 'LightboxPreview'
