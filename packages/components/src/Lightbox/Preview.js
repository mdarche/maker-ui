import React from 'react'
import { Box } from 'theme-ui'

const Preview = ({ index, set, urls, show }) => {
  const handleClick = i => set(i)

  const getBackground = i => {
    if (i.youtubeId || i.vimeoId || i.htmlVideo) {
      return { bg: '#000' }
    }
    if (i.src) {
      return {
        background: `url('${i.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    }

    return console.log('Placeholder')
  }

  return (
    <Box
      className={show ? 'active' : undefined}
      sx={{
        position: 'fixed',
        display: 'grid',
        p: '20px',
        bg: ['rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 0.66)'],
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gridGap: '20px',
        bottom: 0,
        left: 0,
        right: 0,
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
      {urls.map((item, i) => (
        <Box
          key={i}
          as="button"
          title={item.title}
          onClick={e => handleClick(i)}
          className={i === index ? 'preview-active' : undefined}
          sx={{
            height: 80,
            borderColor: '#ababab',
            ...getBackground(item),
          }}
        />
      ))}
    </Box>
  )
}

export default Preview
