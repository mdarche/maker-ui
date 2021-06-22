import * as React from 'react'
import {
  Flex,
  Button,
  DivProps,
  useMeasure,
  MakerProps,
  mergeSelectors,
} from 'maker-ui'
import { useSpring, animated, SpringConfig } from '@react-spring/web'

import { useTracker } from '../hooks'
import { CloseIcon } from './icons'

const AnimatedDiv = animated(Flex)

export interface AnnouncementProps extends DivProps {
  storageKey?: string
  fixed?: boolean
  background?: string | string[]
  type?: 'session' | 'cookie'
  expiration?: number
  allowClose?: boolean
  closeButton?: React.ReactNode | ((attributes?: object) => React.ReactNode)
  bottom?: boolean
  top?: boolean
  springConfig?: SpringConfig
  _css?: MakerProps['css']
}

/**
 * The `Announcement` component renders a dismissable message to the top or bottom of the web page.
 * You can choose the user's session or attach a cookie to determine when it appears / re-appears.
 *
 * @link https://maker-ui.com/docs/components/announcement
 */

export const Announcement = React.forwardRef<HTMLDivElement, AnnouncementProps>(
  (
    {
      storageKey = 'mui_dismiss_announce',
      background = 'var(--color-primary)',
      className,
      color = '#fff',
      fixed = false,
      type = 'session',
      expiration = 2592000, // 30 days
      allowClose = true,
      closeButton = <CloseIcon />,
      bottom = false,
      springConfig,
      _css,
      css,
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = React.useState(true)
    const [initialRender, setInitialRender] = React.useState(false)
    const [measureRef, { height: viewHeight }] = useMeasure()
    const active = useTracker({ type, storageKey, show, expiration })

    React.useEffect(() => {
      setInitialRender(true)
    }, [])

    const spring = useSpring({
      transform: fixed
        ? show && initialRender
          ? 'translateY(0%)'
          : `translateY(${!bottom && '-'}100%)`
        : undefined,
      height: !fixed && initialRender ? (show ? viewHeight : 0) : undefined,
      opacity: show ? 1 : 0,
      config: springConfig,
    })

    const btnAttributes = {
      className: 'announcement-close',
      title: 'Dismiss',
      'aria-label': 'Dismiss',
      onClick: () => set(false),
      css: {
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        padding: '0 15px',
        color,
        svg: { height: 27, fill: color },
      },
    }

    return active ? (
      <AnimatedDiv
        ref={ref}
        className={mergeSelectors(['announcement', className])}
        style={spring as any}
        css={{
          display: 'flex',
          alignItems: 'center',
          background,
          color,
          willChange: !fixed ? 'height' : undefined,
          ...fixedPartial(fixed, bottom),
          ...(_css as object),
        }}>
        <Flex
          className="container"
          ref={measureRef}
          css={{ width: '100%', alignItems: 'center', ...(css as object) }}>
          <Flex
            className="announcement-text"
            css={{
              flex: 1,
              flexWrap: 'wrap',
            }}
            {...props}>
            {children}
          </Flex>
          {allowClose && !closeButton ? (
            typeof closeButton === 'function' ? (
              closeButton(btnAttributes)
            ) : (
              <Button {...btnAttributes}>{closeButton}</Button>
            )
          ) : null}
        </Flex>
      </AnimatedDiv>
    ) : null
  }
)

Announcement.displayName = 'Announcement'

/**
 * Returns a CSS object that positions the announcement bar
 *
 * @param fixed - boolean that determines fixed position
 * @param bottom - boolean that indicates bottom position
 *
 */
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
