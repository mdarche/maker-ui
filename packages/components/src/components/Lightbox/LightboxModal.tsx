import * as React from 'react'
import { Div, DivProps } from 'maker-ui'

import { Modal } from '../Modal'
import { Canvas } from './Canvas'
import { NavButton } from './NavButton'
import { Toolbar } from './Toolbar'
import { Preview } from './Preview'
import { useLightbox } from './LightboxContext'

interface LightboxModalProps extends DivProps {
  focusRef?: React.MutableRefObject<any>
  show?: boolean
  bg?: string | string
}
/**
 * The `LightboxModal` houses all views for the Lightbox component.
 *
 * @todo - implement zoom feature
 * @todo - add Carousel for slider
 *
 * @internal usage only
 */

export const LightboxModal = ({
  id,
  focusRef,
  show,
  bg = 'rgba(0, 0, 0, 0.8)',
  children,
  ...props
}: LightboxModalProps) => {
  const {
    index,
    variant,
    active,
    data,
    settings,
    setIndex,
    toggleLightbox,
  } = useLightbox()
  const [play, setPlay] = React.useState(false)
  const [preview, setPreview] = React.useState(false)
  const [zoom, setZoom] = React.useState(false)
  const [controlsActive, setControlsActive] = React.useState(true)

  /**
   * Handle autoPlay controls
   */

  React.useEffect(() => {
    if (play) {
      if (!data[index].src || data[index].htmlVideo) {
        setPlay(false)
      }

      const auto = setTimeout(() => {
        setIndex('next')
      }, settings.autoPlayDuration)

      return () => clearTimeout(auto)
    }
  }, [play, index, settings.autoPlayDuration, data, setIndex])

  /**
   * Hide preview area when lightbox closes
   */

  React.useEffect(() => {
    if (!active && preview) {
      setPreview(false)
    }

    if (!active && !controlsActive) {
      setControlsActive(true)
    }
  }, [active, controlsActive, preview])

  /**
   * Handle accesible key strokes
   */

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!controlsActive && active && !settings.disableHideControls) {
        setControlsActive(true)
      }
      if (active) {
        switch (e.code) {
          case 'ArrowRight': // right arrow
            return !preview && setIndex('next')
          case 'ArrowLeft': // left arrow
            return !preview && setIndex('previous')
          default:
            return
        }
      }
    },
    [active, controlsActive, preview, setIndex, settings.disableHideControls]
  )

  React.useEffect(() => {
    window.addEventListener(`keydown`, handleKeyDown)

    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  /**
   * Hide controls and reset timer when they appear
   */

  React.useEffect(() => {
    if (active && controlsActive && !settings.disableHideControls && !preview) {
      const hide = setTimeout(() => {
        setControlsActive(false)
      }, 4500)

      return () => clearTimeout(hide)
    }
  }, [active, controlsActive, preview, settings.disableHideControls])

  const showControls = e =>
    !controlsActive && !settings.disableHideControls
      ? setControlsActive(true)
      : undefined

  return (
    <>
      {children}
      <Modal
        isLightbox
        id={id}
        variant={variant}
        show={active}
        //@ts-ignore
        toggle={toggleLightbox}
        focusRef={focusRef}
        bg={bg}
        closeOnBlur={settings.closeOnBlur}
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
            preview={{ show: preview, set: setPreview }}
            zoom={{ show: settings.showZoom, set: setZoom }}
            autoPlay={{ show: play, set: setPlay }}
          />
          {data.length > 1 ? (
            <>
              <Div variant={`${variant}.navigation`} className="lb-navigation">
                <NavButton type="prev" />
                <NavButton type="next" />
              </Div>
              <Preview show={preview} />
            </>
          ) : null}
        </Div>
        {data.length ? (
          <Canvas
            zoom={zoom}
            // onmouseenter={showControls}
          />
        ) : null}
      </Modal>
    </>
  )
}

LightboxModal.displayName = 'LightboxModal'
