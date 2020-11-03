import React, { useState } from 'react'
import { Flex, Button, DivProps } from 'maker-ui'
import { useSpring, animated as a } from 'react-spring'

import { useTracker, useMeasure } from './_hooks'
import { CloseIcon } from './icons'

const AnimatedBox = a(Flex)

const fixedPartial = (fixed, bottom) =>
  fixed
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: !bottom && 0,
        bottom: bottom && 0,
        zIndex: 1000,
      }
    : null

export interface AnnouncementProps extends DivProps {
  key?: string
  fixed?: boolean
  trackerType?: string
  expiration?: number
  allowClose?: boolean
  closeButton?: JSX.Element | string | null
  bottom?: boolean
  top?: boolean
}

/**
 * The `Announcement` component renders a dismissable message to the top or bottom of the web page.
 * You can choose the user's session or attach a cookie to determine when it appears / re-appears.
 *
 * @see https://maker-ui.com/docs/components/announcement
 */

export const Announcement = React.forwardRef<HTMLDivElement, AnnouncementProps>(
  (
    {
      variant = 'announcement',
      key = 'mui_dismiss_announce',
      bg = 'primary',
      color = '#fff',
      fixed = false,
      trackerType = 'session',
      expiration = 2592000, // 30 days
      allowClose = true,
      closeButton = <CloseIcon />,
      bottom = false,
      sx,
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = useState(true)
    const [bind, { height: viewHeight }] = useMeasure()
    const active = useTracker(trackerType, key, show, expiration)

    const spring = useSpring({
      transform: fixed
        ? show
          ? 'translateY(0%)'
          : `translateY(${!bottom && '-'}100%)`
        : undefined,
      height: !fixed ? (show ? viewHeight : 0) : undefined,
      opacity: show ? 1 : 0,
    })

    return active ? (
      <AnimatedBox
        ref={ref}
        className="announcement"
        style={spring}
        sx={{
          variant,
          display: 'flex',
          alignItems: 'center',
          bg,
          color,
          willChange: !fixed && 'height',
          ...fixedPartial(fixed, bottom),
        }}>
        <Flex {...bind} sx={{ width: '100%', alignItems: 'center' }}>
          <Flex
            className="announcement-text"
            sx={{
              variant: `${variant}.text`,
              flex: 1,
              flexWrap: 'wrap',
              ...sx,
            }}
            {...props}>
            {children}
          </Flex>
          {allowClose && (
            <Button
              className="announcement-close"
              title="Dismiss"
              aria-label="Dismiss"
              onClick={e => set(false)}
              sx={{
                variant: `${variant}.close`,
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                px: '15px',
                color,
                svg: { height: 27, fill: color },
              }}>
              {closeButton}
            </Button>
          )}
        </Flex>
      </AnimatedBox>
    ) : null
  }
)
