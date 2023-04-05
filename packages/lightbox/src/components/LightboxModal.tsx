import React, { useState, useCallback, useEffect } from 'react'
import { cn, merge } from '@maker-ui/utils'
import { Spinner } from '@maker-ui/spinners'
import { Modal } from '@maker-ui/modal'
import { MakerCSS, Style } from '@maker-ui/style'

import { NavButton } from './NavButton'
import { Toolbar } from './Toolbar'
import { Preview } from './Preview'
import { useLightbox } from './Provider'
import { MediaFrame } from './MediaFrame'

interface LightboxModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    MakerCSS {
  focusRef?: any
  show?: boolean
  background?: string | string
}
/**
 * The `LightboxModal` houses all views for the Lightbox component.
 *
 * @todo - implement zoom feature
 * @internal
 */
export const LightboxModal = ({
  id,
  className,
  focusRef,
  show,
  background = 'rgba(0, 0, 0, 0.8)',
  children,
  css,
  breakpoints,
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
      <Style
        breakpoints={breakpoints}
        css={merge(
          {
            '.mkui-lightbox-canvas': {
              maxHeight: ['68vh', '88vh'],
              maxWidth: ['90vw', '75vw'],
            },
            '.with-info .mkui-lightbox-media': {
              height: ['calc(100% - 100px)', 'calc(100% - 50px)'],
            },
            '.mkui-lightbox-toolbar': {
              background: ['rgba(0, 0, 0, 0.25)', 'transparent'],
            },
            '.mkui-lightbox-pagination': {
              background: ['transparent', 'rgba(0, 0, 0, 0.25)'],
            },
            '.mkui-lightbox-btn-group': {
              background: ['transparent', 'rgba(0, 0, 0, 0.25)'],
            },
            '.mkui-lightbox-btn-nav': {
              padding: ['20px 40px', '20px'],
              width: ['calc(50% - 15px)', 'auto'],
              height: ['auto', '10vh'],
              top: ['initial', '50%'],
              bottom: ['10px', 'initial'],
              '&.prev': {
                transform: [
                  'translateY(0) rotate(180deg)',
                  'translateY(-50%) rotate(180deg)',
                ],
              },
              '&.next': {
                transform: ['translateY(0)', 'translateY(-50%)'],
              },
            },
          },
          css || {}
        )}
      />
      <Modal
        id={id}
        show={active}
        set={toggleLightbox}
        focusRef={focusRef}
        background={background}
        closeOnBlur={settings.closeOnBlur}
        className={cn(['mkui-lightbox', className])}
        {...props}>
        <div
          onMouseEnter={showControls}
          className={cn([
            'mkui-lightbox-controls',
            controlsActive ? 'visible' : 'hidden',
          ])}>
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
            className={cn([
              'mkui-lightbox-canvas',
              settings?.showInfo ? 'with-info' : undefined,
            ])}>
            <Spinner
              className="mkui-lightbox-spinner"
              type={settings.spinnerType}
              colors={['#fff', '#fff', '#fff']}
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
