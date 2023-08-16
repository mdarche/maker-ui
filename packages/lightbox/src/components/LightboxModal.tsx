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
import { cssVariables } from '../variables'
import type { LightboxStyles } from '@/types'

interface LightboxModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    MakerCSS {
  focusRef?: any
  show?: boolean
  background?: string
  styles?: LightboxStyles
}
/**
 * The `LightboxModal` houses all views for the Lightbox component.
 *
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
  styles,
  breakpoints,
  ...props
}: LightboxModalProps) => {
  const { index, active, data, settings, setIndex, toggleLightbox } =
    useLightbox()
  const [play, setPlay] = useState(false)
  const [preview, setPreview] = useState(false)
  const [controlsActive, setControlsActive] = useState(true)
  const item = data[index]
  const variables = cssVariables(styles)

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

  const toolbarBg = 'var(--lbx-toolbar-bg, rgba(0, 0, 0, 0.25))'
  return (
    <>
      {children}
      <Style
        id="mkui-lbx-styles"
        breakpoints={breakpoints}
        css={merge(
          {
            '.mkui-lbx-canvas': {
              maxHeight: ['68vh', '88vh'],
              maxWidth: ['90vw', '75vw'],
            },
            '.with-info .mkui-lbx-media': {
              height: ['calc(100% - 100px)', 'calc(100% - 50px)'],
            },
            '.mkui-lbx-toolbar': {
              background: [toolbarBg, 'transparent'],
            },
            '.mkui-lbx-pagination': {
              background: ['transparent', toolbarBg],
            },
            '.mkui-lbx-btn-group': {
              background: ['transparent', toolbarBg],
            },
            '.mkui-lbx-btn-nav': {
              width: ['calc(50% - 15px)', 'auto'],
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
        focusSettings={{
          trapVisibleOnly: true,
          triggerFocusCheck: preview,
          triggerFocusDelay: 350,
        }}
        duration={250}
        className={cn(['mkui-lbx', className])}
        {...props}>
        <div
          onMouseEnter={showControls}
          style={variables}
          className={cn([
            'mkui-lbx-controls',
            controlsActive ? 'visible' : 'hidden',
          ])}>
          <Toolbar
            preview={{ show: preview, set: setPreview }}
            autoPlay={{ show: play, set: setPlay }}
          />
          {data.length > 1 ? (
            <>
              <div className="mkui-lbx-navigation">
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
              'mkui-lbx-canvas',
              settings?.showInfo ? 'with-info' : undefined,
            ])}>
            <Spinner
              className="mkui-lbx-spinner"
              type={settings.spinnerType}
              colors="#fff"
            />
            <MediaFrame index={index} item={item} />
            {settings.showInfo && item.title && (
              <div className="mkui-lbx-info">
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
