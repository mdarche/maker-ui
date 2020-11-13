import React, { useState, useEffect } from 'react'
import { Div, MakerProps } from 'maker-ui'
import merge from 'deepmerge'

import { Modal } from '../Modal'
import { Canvas } from './Canvas'
import { NavButton } from './NavButton'
import { Toolbar } from './Toolbar'
import { Preview } from './Preview'
import { useLightbox, LightboxData } from './LightboxContext'

interface LightboxModalProps extends MakerProps {
  id: string
  focusRef?: React.MutableRefObject<any>
  show?: boolean
  data: LightboxData[]
  settings?: Object
  children: React.ReactElement | React.ReactElement
}
/**
 * The `LightboxModal` houses all views for the Lightbox component.
 *
 * @todo - implement zoom feature
 * @todo - add gesture controls and canvas transition options
 *
 * @internal use only
 */

export const LightboxModal = ({
  id,
  focusRef,
  show,
  variant = 'lightbox',
  bg = 'rgba(0, 0, 0, 0.8)',
  settings = {},
  children,
  ...props
}: LightboxModalProps) => {
  const { index, active, data, toggleLightbox } = useLightbox()
  const [current, setCurrent] = useState(0)
  const [play, setPlay] = useState(false)
  const [preview, setPreview] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [controlsActive, setControlsActive] = useState(true)

  const config = merge(
    {
      closeOnBlur: true,
      customArrow: undefined,
      showInfo: true,
      showCount: true,
      showZoom: false,
      showAutoPlay: true,
      autoPlayDuration: 6000,
      disableHideControls: false,
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

  const next = () => setCurrent(s => (s === data.length - 1 ? 0 : s + 1))
  const prev = () => setCurrent(s => (s === 0 ? data.length - 1 : s - 1))

  const showControls = e =>
    !controlsActive && !config.disableHideControls
      ? setControlsActive(true)
      : undefined

  return (
    <>
      {children}
      <Modal
        id={id}
        variant={variant}
        show={active}
        toggle={toggleLightbox}
        focusRef={focusRef}
        bg={bg}
        closeOnBlur={config.closeOnBlur}
        {...props}>
        <Div
          onMouseEnter={showControls}
          variant={`${variant}.controls`}
          className={`lb-controls ${controlsActive ? 'visible' : 'hidden'}`}
          sx={{
            opacity: 0,
            transition: 'all ease .25s',
            '&.visible': {
              opacity: 1,
            },
          }}>
          <Toolbar
            variant={variant}
            count={config.showCount}
            current={current}
            item={data[current]}
            length={data.length}
            preview={{ show: preview, set: setPreview }}
            zoom={{ show: config.showZoom, set: setZoom }}
            autoPlay={{ show: config.showAutoPlay, active: play, set: setPlay }}
            toggle={toggleLightbox}
          />
          {data.length > 1 ? (
            <>
              <Div variant={`${variant}.navigation`} className="lb-navigation">
                <NavButton
                  variant={`${variant}.prev`}
                  arrow={config.customArrow}
                  control={prev}
                />
                <NavButton
                  variant={`${variant}.next`}
                  arrow={config.customArrow}
                  control={next}
                  isNext
                />
              </Div>
              <Preview
                variant={`${variant}.preview`}
                show={preview}
                index={current}
                set={setCurrent}
                data={data}
              />
            </>
          ) : null}
        </Div>
        {data.length ? (
          <Canvas
            variant={variant}
            index={current}
            data={data}
            showInfo={config.showInfo}
            zoom={zoom}
            onMouseEnter={showControls}
          />
        ) : null}
      </Modal>
    </>
  )
}
