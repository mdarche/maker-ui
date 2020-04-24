import React, { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { Modal } from '@maker-ui/components'
import merge from 'deepmerge'

import Canvas from './Canvas'
import NavButton from './NavButton'
import Toolbar from './Toolbar'
import Preview from './Preview'
import { useLightbox } from './LightboxProvider'

// TODO implement zoom feature

const LightboxModal = ({
  id,
  focusRef,
  show,
  bg = 'rgba(0, 0, 0, 0.8)',
  settings = {},
  children,
  ...props
}) => {
  const { index, active, data, toggleLightbox } = useLightbox()
  const [current, setCurrent] = useState(0)
  const [play, setPlay] = useState(false)
  const [preview, setPreview] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [controlsActive, setControlsActive] = useState(true)

  const config = merge(
    {
      showInfo: true,
      showCount: true,
      showZoom: false,
      showAutoPlay: true,
      autoPlayDuration: 6000,
      disableHideControls: false,
      closeOnBlur: false,
      customArrow: undefined,
    },
    settings
  )

  // Handle external lightbox toggle

  useEffect(() => {
    if (show) {
      toggleLightbox()
    }
  }, [show])

  // Update canvas when index changes

  useEffect(() => {
    setCurrent(index)
  }, [index])

  // Handle autoPlay controls

  useEffect(() => {
    if (play) {
      if (!data[current].src || data[current].htmlVideo) {
        setPlay(false)
      }

      const auto = setTimeout(() => {
        next()
      }, config.autoPlayDuration)

      return () => clearTimeout(auto)
    }
  }, [play, current, config.autoPlayDuration])

  // Handle keystrokes and hide preview area when lightbox closes

  useEffect(() => {
    if (!active && preview) {
      setPreview(false)
    }

    if (!active && !controlsActive) {
      setControlsActive(true)
    }

    function handleKeyDown(e) {
      if (!controlsActive && active && !config.disableHideControls) {
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
  }, [active, controlsActive, config.disableHideControls])

  // Hide controls and reset counter when they appear

  useEffect(() => {
    if (active && controlsActive && !config.disableHideControls && !preview) {
      const hide = setTimeout(() => {
        setControlsActive(false)
      }, 4500)

      return () => clearTimeout(hide)
    }
  }, [active, controlsActive, preview, config.disableHideControls])

  const next = e => setCurrent(s => (s === data.length - 1 ? 0 : s + 1))
  const prev = e => setCurrent(s => (s === 0 ? data.length - 1 : s - 1))

  const showControls = e =>
    !controlsActive && !config.disableHideControls
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
        closeOnBlur={config.closeOnBlur}
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
            count={config.showCount}
            current={current}
            item={data[current]}
            length={data.length}
            preview={{ show: preview, set: setPreview }}
            zoom={{ show: config.showZoom, set: setZoom }}
            autoPlay={{ show: config.showAutoPlay, active: play, set: setPlay }}
            toggle={toggleLightbox}
          />
          {data.length > 1 && (
            <React.Fragment>
              <Box className="lightbox-navigation">
                <NavButton arrow={config.customArrow} control={prev} />
                <NavButton arrow={config.customArrow} control={next} isNext />
              </Box>
              <Preview
                show={preview}
                index={current}
                set={setCurrent}
                data={data}
              />
            </React.Fragment>
          )}
        </Box>
        {data.length && (
          <Canvas
            index={current}
            data={data}
            info={config.showInfo}
            zoom={zoom}
            onMouseEnter={showControls}
          />
        )}
      </Modal>
    </React.Fragment>
  )
}

export default LightboxModal
