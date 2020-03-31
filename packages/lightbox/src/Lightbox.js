import React, { useState, useEffect, useRef } from 'react'
import { Box } from 'theme-ui'
import { Modal } from '@maker-ui/components'

import Canvas from './Canvas'
import NavButton from './NavButton'
import Toolbar from './Toolbar'
import Preview from './Preview'
import { LightboxProvider, useLightbox } from './LightboxProvider'

// TODO add all variants to basic variant arry and make an extra installation step

// TODO implement zoom feature

const LightboxModal = ({
  id,
  title,
  closeOnBlur,
  focusRef,
  arrow,
  data,
  bg = 'rgba(0, 0, 0, 0.8)',
  showInfo = true,
  showCount = true,
  showZoom = false,
  showAutoPlay = true,
  duration = 6000,
  disableHideControls = false,
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
  const [controlsActive, setControlsActive] = useState(true)

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
      if (!urls[current].src || urls[current].htmlVideo) {
        setPlay(false)
      }

      const auto = setTimeout(() => {
        next()
      }, duration)

      return () => clearTimeout(auto)
    }
  }, [play, current])

  useEffect(() => {
    if (!active && preview) {
      setPreview(false)
    }

    if (!active && !controlsActive) {
      setControlsActive(true)
    }

    function handleKeyDown(e) {
      if (!controlsActive && active && !disableHideControls) {
        setControlsActive(true)
      }
      switch (e.keyCode) {
        case 39: // right arrow
          return !preview && next()
        case 37: // left arrow
          return !preview && prev()
        default:
          return
      }
    }

    if (typeof window !== 'undefined') {
      if (active) {
        window.addEventListener(`keydown`, handleKeyDown)
      }
      return () => window.removeEventListener(`keydown`, handleKeyDown)
    }
  }, [active, controlsActive])

  useEffect(() => {
    if (active && controlsActive && !disableHideControls && !preview) {
      const hide = setTimeout(() => {
        setControlsActive(false)
      }, 4500)

      return () => clearTimeout(hide)
    }
  }, [active, controlsActive, preview])

  const next = e => setCurrent(s => (s === urls.length - 1 ? 0 : s + 1))
  const prev = e => setCurrent(s => (s === 0 ? urls.length - 1 : s - 1))

  // const setFocus = ref =>
  //   !play
  //     ? setTimeout(() => {
  //         ref.current.focus()
  //       }, 0)
  //     : null

  const showControls = e =>
    !controlsActive && !disableHideControls
      ? setControlsActive(true)
      : undefined

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
        <Box
          onMouseEnter={showControls}
          className={`lightbox-controls ${
            controlsActive ? 'visible' : 'not-visible'
          }`}
          sx={{
            opacity: 0,
            transition: 'all ease .25s',
            '&.visible': {
              opacity: 1,
            },
          }}>
          <Toolbar
            count={showCount}
            current={current}
            item={urls[current]}
            length={urls.length}
            preview={{ show: preview, set: setPreview }}
            zoom={{ show: showZoom, set: setZoom }}
            autoPlay={{ show: showAutoPlay, active: play, set: setPlay }}
            toggle={toggleLightbox}
          />
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
        </Box>

        {urls.length && (
          <Canvas
            index={current}
            urls={urls}
            info={showInfo}
            zoom={zoom}
            onMouseEnter={showControls}
          />
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
