import * as React from 'react'
import { Flex, Button, DivProps, useMeasure } from 'maker-ui'
import { useSpring, animated, SpringConfig } from 'react-spring'

import { useTracker } from '../hooks'
import { CloseIcon } from './icons'

const AnimatedDiv = animated(Flex)

const fixedPartial = (fixed: boolean, bottom: boolean): object | undefined =>
  fixed
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: !bottom && 0,
        bottom: bottom && 0,
        zIndex: 1000,
      }
    : undefined

export interface AnnouncementProps extends DivProps {
  storageKey?: string
  fixed?: boolean
  background?: string | string[]
  type?: 'session' | 'cookie'
  expiration?: number
  allowClose?: boolean
  closeButton?: React.ReactNode
  bottom?: boolean
  top?: boolean
  springConfig?: SpringConfig
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
      storageKey = 'mui_dismiss_announce',
      background = 'var(--color-primary)',
      color = '#fff',
      fixed = false,
      type = 'session',
      expiration = 2592000, // 30 days
      allowClose = true,
      closeButton = <CloseIcon />,
      bottom = false,
      springConfig,
      css,
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = React.useState(true)
    const [bind, { height: viewHeight }] = useMeasure()
    const active = useTracker({ type, storageKey, show, expiration })

    const spring = useSpring({
      transform: fixed
        ? show
          ? 'translateY(0%)'
          : `translateY(${!bottom && '-'}100%)`
        : undefined,
      height: !fixed ? (show ? viewHeight : 0) : undefined,
      opacity: show ? 1 : 0,
      config: springConfig,
    })

    return active ? (
      <AnimatedDiv
        ref={ref}
        className="announcement"
        style={spring}
        css={{
          display: 'flex',
          alignItems: 'center',
          background,
          color,
          willChange: !fixed && ['height'],
          ...fixedPartial(fixed, bottom),
        }}>
        <Flex {...bind} css={{ width: '100%', alignItems: 'center' }}>
          <Flex
            className="announcement-text"
            css={{
              flex: 1,
              flexWrap: 'wrap',
              ...(css as object),
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
              css={{
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: '0 15px',
                color,
                svg: { height: 27, fill: color },
              }}>
              {closeButton}
            </Button>
          )}
        </Flex>
      </AnimatedDiv>
    ) : null
  }
)

Announcement.displayName = 'Announcement'
