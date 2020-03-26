import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Box, Flex } from 'theme-ui'

import Canvas from './Canvas'
import Controls from './Controls'
import Preview from './Preview'
import { ZoomIcon, PreviewIcon, PlayIcon, CloseIcon } from '../icons'
import { LightboxProvider, useLightbox } from './LightboxProvider'
import Modal from '../Modal'

// TODO add all variants to basic variant arry and make an extra installation step

// TODO add Keyboard controls

// TODO add hover/focus controls for hiding UI

// TODO remove focus from next for autoplay

const LightboxModal = ({
  id,
  title,
  show,
  toggle,
  closeOnBlur,
  focusRef,
  arrow,
  showInfo = true,
  showCount = true,
  showZoom = true,
  showAutoPlay = true,
  duration = 6000,
  children,
  ...props
}) => {
  const { index, active, urls, toggleLightbox } = useLightbox()
  const [current, setCurrent] = useState(0)
  const nextRef = useRef(null)
  const [play, setPlay] = useState(false)
  const [preview, setPreview] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [hideControls, setHideControls] = useState(false)

  useEffect(() => {
    setCurrent(index)
  }, [index])

  useEffect(() => {
    if (play) {
      const auto = setTimeout(() => {
        next()
      }, duration)

      return () => clearTimeout(auto)
    }
  }, [play])

  const next = e => {
    // TODO - keep focus on controls after click
    if (current === urls.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }

    if (!play) {
      setTimeout(() => {
        nextRef.current.focus()
      }, 10)
    }
  }

  const prev = e =>
    current === 0 ? setCurrent(urls.length - 1) : setCurrent(current - 1)

  return (
    <React.Fragment>
      {children}
      <Modal
        id={id}
        show={active}
        toggle={toggleLightbox}
        focusRef={focusRef}
        bg="rgba(0, 0, 0, 0.75)"
        closeOnBlur
        {...props}>
        <Box className="toolbar">
          {showCount && urls.length && (
            <Box
              className="pagination"
              __css={{
                position: 'absolute',
                top: 0,
                left: 0,
                bg: 'rgba(0, 0, 0, 0.25)',
                p: '14px 20px',
                fontSize: '14px',
                color: '#fff',
              }}>
              {current + 1} / {urls.length}
            </Box>
          )}
          <Flex
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bg: 'rgba(0, 0, 0, 0.25)',
              button: {
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                p: '10px 20px',
                transition: 'all ease .3s',
                '&:hover': {
                  bg: 'rgba(0,0,0,0.66)',
                },
              },
              svg: { fill: '#fff' },
            }}>
            {showZoom && (
              <button
                disabled={!urls[current].src}
                onClick={e => setZoom(!zoom)}>
                <ZoomIcon height="18" />
              </button>
            )}
            {showAutoPlay && (
              <button onClick={e => setPlay(!play)}>
                <PlayIcon height="24" />
              </button>
            )}
            <button onClick={e => setPreview(!preview)}>
              <PreviewIcon height="21" />
            </button>
            <button onClick={e => toggleLightbox()}>
              <CloseIcon height="24" />
            </button>
          </Flex>
        </Box>
        {urls.length ? (
          <Canvas index={current} urls={urls} info={showInfo} />
        ) : (
          'Loading'
        )}
        {urls.length > 1 && (
          <Controls controls={{ prev, next }} arrow={arrow} ref={nextRef} />
        )}
      </Modal>
    </React.Fragment>
  )
}

const Lightbox = ({ children, ...props }) => (
  <LightboxProvider>
    <LightboxModal {...props}>{children}</LightboxModal>
  </LightboxProvider>
)

export default Lightbox
