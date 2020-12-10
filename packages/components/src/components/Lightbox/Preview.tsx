import * as React from 'react'
import { Grid, Button } from 'maker-ui'

import { LightboxData } from './LightboxContext'

interface PreviewProps {
  variant?: string | string[]
  index?: number
  set?: Function
  show?: boolean
  data?: LightboxData[]
}

/**
 * The `Preview` component shows additional gallery items while the lightbox view
 * is active.
 *
 * @internal usage only
 */

export const Preview = ({ variant, index, set, data, show }: PreviewProps) => {
  const ref = React.useRef(null)
  const handleClick = i => set(i)

  React.useEffect(() => {
    if (show) {
      setTimeout(() => {
        ref.current.querySelector('button').focus()
      }, 100)
    }
  }, [show])

  const getBackground = i => {
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
      variant={variant}
      columns={['repeat(auto-fill, minmax(100px, 1fr))']}
      gap={20}
      className={`${show ? 'active ' : ''}lb-preview`}
      sx={{
        position: ['fixed'],
        p: '20px',
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
      {data.map((item, i) => (
        <Button
          key={i}
          title={item.title}
          onClick={e => handleClick(i)}
          className={i === index ? 'preview-active' : undefined}
          sx={{
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
