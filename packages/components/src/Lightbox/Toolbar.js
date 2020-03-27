import React from 'react'
import { Box, Flex } from 'theme-ui'

import { ZoomIcon, PreviewIcon, PlayIcon, CloseIcon } from '../icons'

const Toolbar = ({
  count,
  current,
  length,
  preview,
  zoom,
  autoPlay,
  toggle,
  item,
}) => {
  return (
    <Flex
      className="toolbar"
      __css={{
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bg: ['rgba(0, 0, 0, 0.25)', 'transparent'],
      }}>
      {count && length && (
        <Box
          className="pagination"
          __css={{
            bg: ['transparent', 'rgba(0, 0, 0, 0.25)'],
            p: '14px 20px',
            fontSize: '14px',
            color: '#fff',
          }}>
          {current + 1} / {length}
        </Box>
      )}
      <Flex
        sx={{
          bg: ['transparent', 'rgba(0, 0, 0, 0.25)'],
          button: {
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            // border: '2px solid transparent',
            p: '8px 20px',
            my: '2px',
            transition: 'all ease .3s',
            '&:hover': {
              bg: 'rgba(0,0,0,0.66)',
            },
            '&:focus': {
              outline: '2px solid rgba(255,255,255,0.33)',
              // boxShadow: 'none'
            },
          },
          'button:last-of-type': {
            mr: [0, '5px'],
          },
          svg: { fill: '#fff' },
        }}>
        {zoom.show && (
          <button
            disabled={item.src && !item.htmlVideo ? true : undefined}
            onClick={e => zoom.set(z => !z)}>
            <ZoomIcon height="18" />
          </button>
        )}
        {autoPlay.show && (
          <button onClick={e => autoPlay.set(a => !a)}>
            <PlayIcon height="24" />
          </button>
        )}
        <button onClick={e => preview(p => !p)}>
          <PreviewIcon height="21" />
        </button>
        <button onClick={e => toggle()}>
          <CloseIcon height="24" />
        </button>
      </Flex>
    </Flex>
  )
}

export default Toolbar
