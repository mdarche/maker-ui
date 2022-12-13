import * as React from 'react'
import { useScrollPosition } from '@maker-ui/utils'

import type { Options } from '@/types'
import { useMenu } from './Provider'

interface EffectsProps {
  options: Options
}

export const Effects = ({
  options: {
    header: { stickyUpScroll, scrollClass: sc },
    mobileMenu,
    sideNav,
  },
}: EffectsProps) => {
  const { active, setMenu } = useMenu()
  const [scrollClass, setScrollClass] = React.useState('')
  const [show, setShow] = React.useState(true)
  const activateScrollClass = !!sc

  React.useEffect(() => {
    // Any other event listeners that should be added to the window object
    // - Sidenav close on route change
    // - Mobile menu close on route change
    // - Sidenav collapse on resize
  }, [])

  /**
   * Handle mobile menu overlay clicks
   */
  React.useEffect(() => {
    const o = document.querySelector('.mkr_overlay_m')
    if (!o) return
    if (!mobileMenu.closeOnBlur) return
    const click = (e: any) => {
      e.preventDefault()
      setMenu('menu', false)
    }
    o.addEventListener('click', click)
    return () => o.removeEventListener('click', click)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Handle sidenav overlay clicks
   */
  React.useEffect(() => {
    const o = document.querySelector('.mkr_overlay_s')
    if (!o) return
    if (!sideNav.closeOnBlur) return
    const click = (e: any) => {
      e.preventDefault()
      setMenu('sidenav', false)
    }
    o.addEventListener('click', click)
    return () => o.removeEventListener('click', click)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Handle disappearing header on up scroll
   */
  // React.useEffect(() => {
  //   const header = document.querySelector('.mkr_header')
  //   if (header) {
  //     if (scrollClass.length) {
  //       header.classList.add('sticky')
  //     } else {
  //       header.classList.remove('sticky')
  //     }
  //   }
  // }, [scrollClass])

  React.useEffect(() => {
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
