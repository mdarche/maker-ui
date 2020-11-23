import React from 'react'
import { Div, Flex } from 'maker-ui'

import { LightboxData } from './LightboxContext'
import { ZoomIcon, PreviewIcon, PlayIcon, CloseIcon } from '../icons'

interface ToolbarProps {
  variant?: string | string[]
  count?: boolean
  current?: number
  length?: number
  preview?: { show: boolean; set: Function }
  zoom?: { show: boolean; set: Function }
  autoPlay?: { active: boolean; show: boolean; set: Function }
  toggle: Function
  item: LightboxData
}

/**
 * The `Toolbar` component provides utility button options inside the lightbox.
 *
 * @internal usage only
 */

export const Toolbar = ({
  variant,
  count,
  current,
  length,
  preview,
  zoom,
  autoPlay,
  toggle,
  item,
}: ToolbarProps) => {
  return (
    <Flex
      variant={`${variant}.toolbar`}
      className="lb-toolbar"
      sx={{
        alignItems: 'center',
        justifyContent: length > 1 ? 'space-between' : 'flex-end',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bg: ['rgba(0, 0, 0, 0.25)', 'transparent'],
      }}>
      {count && length > 1 && (
        <Div
          variant={`${variant}.pagination`}
          className="lb-pagination"
          sx={{
            bg: ['transparent', 'rgba(0, 0, 0, 0.25)'],
            p: '14px 20px',
            fontSize: '14px',
            color: '#fff',
          }}>
          {current + 1} / {length}
        </Div>
      )}
      <Flex
        className="lb-button-group"
        sx={{
          bg: ['transparent', 'rgba(0, 0, 0, 0.25)'],
          button: {
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            p: '8px 20px',
            m: '2px',
            transition: 'all ease .3s',
            '&:hover, &:active, &.active': {
              bg: 'primary',
            },
            '&:focus': {
              outline: '2px solid rgba(255,255,255,0.35)',
            },
          },
          'button:last-of-type': {
            mr: [0, '5px'],
          },
          svg: { fill: '#fff' },
        }}>
        {zoom.show ? (
          <button
            className="lb-zoom"
            disabled={item.src && !item.htmlVideo ? true : undefined}
            onClick={e => zoom.set(z => !z)}>
            <ZoomIcon height="18" />
          </button>
        ) : null}
        {autoPlay.show && length > 1 ? (
          <button
            className={`${autoPlay.active ? 'active ' : ''}lb-autoplay`}
            onClick={e => autoPlay.set(a => !a)}>
            <PlayIcon height="24" />
          </button>
        ) : null}
        {length > 1 ? (
          <button
            className={`${preview.show ? 'active ' : ''}lb-preview`}
            onClick={e => preview.set(p => !p)}>
            <PreviewIcon height="21" />
          </button>
        ) : null}
        <button className="lb-close" onClick={e => toggle()}>
          <CloseIcon height="24" />
        </button>
      </Flex>
    </Flex>
  )
}
