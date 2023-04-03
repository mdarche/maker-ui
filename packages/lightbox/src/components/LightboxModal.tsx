import React, { useState, useCallback, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import { Spinner } from '@maker-ui/spinners'
import { Modal } from '@maker-ui/modal'

import { NavButton } from './NavButton'
import { Toolbar } from './Toolbar'
import { Preview } from './Preview'
import { useLightbox } from './Provider'
import { MediaFrame } from './MediaFrame'

interface LightboxModalProps extends React.HTMLAttributes<HTMLDivElement> {
  focusRef?: any
  show?: boolean
  background?: string | string
}
/**
 * The `LightboxModal` houses all views for the Lightbox component.
 *
 * @todo - implement zoom feature
 * @todo - add Carousel for slider
 *
 * @internal
 */
export const LightboxModal = ({
  id,
  focusRef,
  show,
  background = 'rgba(0, 0, 0, 0.8)',
  children,
  // css,
  ...props
}: LightboxModalProps) => {
  const { index, active, data, settings, setIndex, toggleLightbox } =
    useLightbox()
  const [play, setPlay] = useState(false)
  const [preview, setPreview] = useState(false)
  // const [zoom, setZoom] = React.useState(false)
  const [controlsActive, setControlsActive] = useState(true)
  const item = data[index]

  /**
   * Handle autoPlay controls
   */
  useEffect(() => {
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
  useEffect(() => {
    if (!active && preview) {
      setPreview(false)
    }

    if (!active && !controlsActive) {
      setControlsActive(true)
    }
  }, [active, controlsActive, preview])

  /**
   * Handle accesible key strokes
   * @TODO replace this with useKeydown hook
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!controlsActive && active && !settings.disableHideControls) {
        setControlsActive(true)
      }
      if (active) {
        switch (e.code) {
          case 'ArrowRight':
            return !preview && setIndex('next')
          case 'ArrowLeft':
            return !preview && setIndex('previous')
          default:
            return
        }
      }
    },
    [active, controlsActive, preview, setIndex, settings.disableHideControls]
  )

  useEffect(() => {
    window.addEventListener(`keydown`, handleKeyDown)

    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  /**
   * Hide controls and reset timer when they appear
   */
  useEffect(() => {
    if (active && controlsActive && !settings.disableHideControls && !preview) {
      const hide = setTimeout(() => {
        setControlsActive(false)
      }, 4500)

      return () => clearTimeout(hide)
    }
  }, [active, controlsActive, preview, settings.disableHideControls])

  const showControls = () =>
    !controlsActive && !settings.disableHideControls
      ? setControlsActive(true)
      : undefined

  return (
    <>
      {children}
      <Modal
        id={id}
        show={active}
        set={toggleLightbox}
        focusRef={focusRef}
        background={background}
        closeOnBlur={settings.closeOnBlur}
        {...props}>
        <div
          onMouseEnter={showControls}
          className={cn([
            'mkui-lightbox-controls',
            controlsActive ? 'visible' : 'hidden',
          ])}
          // css={{
          //   opacity: 0,
          //   transition: 'all ease .25s',
          //   '&.visible': {
          //     opacity: 1,
          //   },
          // }}
        >
          <Toolbar
            preview={{ show: preview, set: setPreview }}
            autoPlay={{ show: play, set: setPlay }}
          />
          {data.length > 1 ? (
            <>
              <div className="mkui-lightbox-navigation">
                <NavButton type="prev" />
                <NavButton type="next" />
              </div>
              <Preview show={preview} />
            </>
          ) : null}
        </div>
        {data.length ? (
          <div
            className="mkui-lightbox-canvas"
            // css={{
            //   position: 'absolute',
            //   top: '50%',
            //   left: '50%',
            //   height: '100%',
            //   width: '100%',
            //   overflowY: 'scroll',
            //   maxHeight: ['68vh', '88vh'],
            //   maxWidth: ['90vw', '75vw'],
            //   transform: 'translate(-50%, -50%)',
            //   'img, video, iframe': {
            //     height:
            //       item.title && settings.showInfo
            //         ? ['calc(100% - 100px)', 'calc(100% - 50px)']
            //         : '100%',
            //     width: '100%',
            //   },
            //   '.lightbox-info': {
            //     color: '#fff',
            //     h4: {
            //       marginTop: 20,
            //       fontSize: '18px',
            //       textAlign: 'center',
            //     },
            //   },
            //   '.description': {
            //     marginTop: 20,
            //   },
            //   '#media-spinner': {
            //     left: '50%',
            //     top: '50%',
            //     transform: 'translate3d(-50%, -50%, 0)',
            //     position: 'absolute',
            //     zIndex: -1,
            //   },
            // }}
          >
            <Spinner
              className="mkui-lightbox-spinner"
              type={settings.spinnerType}
              colors={['#fff']}
              size={50}
            />
            <MediaFrame item={item} />
            {settings.showInfo && item.title && (
              <div className="mkui-lightbox-info">
                <h4>{item.title}</h4>
                {item.description && (
                  <div className="description">{item.description}</div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </>
  )
}

LightboxModal.displayName = 'LightboxModal'
