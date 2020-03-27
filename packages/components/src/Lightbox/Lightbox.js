import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex } from 'theme-ui'

import Canvas from './Canvas'
import NavButton from './NavButton'
import Toolbar from './Toolbar'
import Preview from './Preview'
import { LightboxProvider, useLightbox } from './LightboxProvider'
import Modal from '../Modal'

// TODO add all variants to basic variant arry and make an extra installation step

// TODO add hover/focus controls for hiding UI

// TODO remove focus from next for autoplay

// TODO implement zoom feature

const LightboxModal = ({
  id,
  title,
  closeOnBlur,
  focusRef,
  arrow,
  data,
  bg = 'rgba(0, 0, 0, 0.85)',
  showInfo = true,
  showCount = true,
  showZoom = false,
  showAutoPlay = true,
  duration = 6000,
  children,
  ...props
}) => {
  const nextRef = useRef(null)
  const prevRef = useRef(null)
  const { index, active, urls, addToGallery, toggleLightbox } = useLightbox()
  const [current, setCurrent] = useState(0)
  const [play, setPlay] = useState(false)
  const [preview, setPreview] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [hideControls, setHideControls] = useState(false)

  useEffect(() => {
    if (data) {
      addToGallery(data)
    }
  }, [data])

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

  useEffect(() => {
    if (!active && preview) {
      setPreview(false)
    }

    function handleKeyDown(e) {
      switch (e.keyCode) {
        case 39: // right arrow
          return next()
        case 37: // left arrow
          return prev()
        default:
          return
      }
    }

    if (active) {
      window.addEventListener(`keydown`, handleKeyDown)
    }
    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [active])

  const next = e => {
    setFocus(nextRef)
    return setCurrent(s => (s === urls.length - 1 ? 0 : s + 1))
  }

  const prev = e => {
    setFocus(prevRef)
    return setCurrent(s => (s === 0 ? urls.length - 1 : s - 1))
  }

  const setFocus = ref =>
    !play
      ? setTimeout(() => {
          ref.current.focus()
        }, 0)
      : null

  return (
    <React.Fragment>
      {children}
      <Modal
        id={id}
        show={active}
        toggle={toggleLightbox}
        focusRef={focusRef}
        bg={bg}
        closeOnBlur
        {...props}>
        <Toolbar
          count={showCount}
          current={current}
          item={urls[current]}
          length={urls.length}
          preview={setPreview}
          zoom={{ show: showZoom, set: setZoom }}
          autoPlay={{ show: showAutoPlay, set: setPlay }}
          toggle={toggleLightbox}
        />
        {urls.length && (
          <Canvas index={current} urls={urls} info={showInfo} zoom={zoom} />
        )}
        {urls.length > 1 && (
          <React.Fragment>
            <Box className="lightbox-navigation">
              <NavButton ref={prevRef} arrow={arrow} control={prev} />
              <NavButton ref={nextRef} arrow={arrow} control={next} isNext />
            </Box>
            <Preview
              show={preview}
              index={current}
              set={setCurrent}
              urls={urls}
            />
          </React.Fragment>
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
