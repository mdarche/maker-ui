import React, { useRef, useEffect } from 'react'
import { Box } from 'theme-ui'

import playIcon from './play.svg'

const Preview = ({ index, set, data, show }) => {
  const handleClick = i => set(i)
  const ref = useRef(null)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        ref.current.querySelector('button').focus()
      }, 100)
    }
  }, [show])

  const getBackground = i => {
    if (i.youtubeId || i.vimeoId || i.htmlVideo) {
      return { background: `url(${playIcon})`, backgroundColor: '#000' }
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
    <Box
      ref={ref}
      className={show ? 'active' : undefined}
      sx={{
        position: 'fixed',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gridGap: '20px',
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
        <Box
          key={i}
          as="button"
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
    </Box>
  )
}

export default Preview
