import React, { useEffect, useState } from 'react'
import { useScrollPosition } from '@maker-ui/utils'

import type { Options } from '@/types'

interface EffectsProps {
  options: Options
}

/**
 * TODO - add the necessary classes to the DOM w/ useEffect
 * -- Mobile Overlay
 */

export const Effects = ({
  options: {
    header: { stickyUpScroll, scrollClass: sc },
  },
}: EffectsProps) => {
  const [scrollClass, setScrollClass] = useState('')
  const [show, setShow] = useState(true)
  const activateScrollClass = !!sc

  React.useEffect(() => {
    // Any other event listeners that should be added to the window object
    // - Sidenav close on route change
    // - Mobile menu close on route change
    // Sidenav and mobile overlay click events
  }, [])

  useEffect(() => {
    const header = document.querySelector('.mkr_header')
    if (header) {
      if (scrollClass.length) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }
  }, [scrollClass])

  useEffect(() => {
    const header = document.querySelector('.mkr_header')
    if (header) {
      if (!!stickyUpScroll && show) {
        header.classList.add('scroll-active')
      } else {
        header.classList.remove('scroll-active')
      }
    }
  }, [stickyUpScroll, show])

  const upScroll: {
    exists: boolean
    start?: number
    delay?: number
  } =
    typeof stickyUpScroll === 'object'
      ? {
          exists: true,
          start: stickyUpScroll?.start,
          delay: stickyUpScroll?.delay,
        }
      : stickyUpScroll
      ? { exists: true }
      : { exists: false }
  const limit = upScroll?.start || 500

  /**
   * Fire hook effect if stickyUpScroll === true
   */
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isDownScroll = currPos > prevPos
      const aboveLimit = currPos > limit

      if (!aboveLimit && !show) {
        setShow(true)
      }

      if (aboveLimit && isDownScroll && show) {
        setShow(false)
      }

      if (aboveLimit && !isDownScroll && !show) {
        setShow(true)
      }
    },
    upScroll.delay || 350,
    upScroll.exists
  )

  /**
   * Fire hook effect if sc !== undefined
   */
  useScrollPosition(
    ({ currPos }) => {
      if (activateScrollClass) {
        const { scrollTop, className } = sc || {}
        const isActive = currPos > scrollTop ? className : ''
        if (isActive !== scrollClass) {
          setScrollClass(isActive)
        }
      }
    },
    0,
    activateScrollClass
  )
  return <></>
}
