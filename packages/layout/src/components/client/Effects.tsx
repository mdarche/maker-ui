import React, { useEffect, useState } from 'react'
import { useScrollPosition, useWindowSize } from '@maker-ui/utils'

import type { Options } from '@/types'
import { useMenu } from './Provider'

interface EffectsProps {
  options: Options
}

type UpScrollSettings = {
  /** Whether the scroll listener should be mounted to the DOM */
  active: boolean
  /** Scroll top where the hide effect should begin */
  start?: number
  /** Optional delay for obtaining new scrollTop */
  delay?: number
}

export const Effects = ({
  options: {
    layout,
    header: { stickyUpScroll, scrollClass },
    mobileMenu,
    sideNav,
  },
}: EffectsProps) => {
  const { reset, setMenu } = useMenu()
  const { width } = useWindowSize()
  const [selector, setSelector] = useState('')
  const [show, setShow] = useState(true)
  const els = ['span', 'a', 'li']
  const upScroll: UpScrollSettings =
    typeof stickyUpScroll === 'object'
      ? {
          active: true,
          start: stickyUpScroll?.start,
          delay: stickyUpScroll?.delay,
        }
      : stickyUpScroll
      ? { active: true }
      : { active: false }
  const limit = upScroll?.start || 500

  /**
   * Collapse SideNav on mobile or when window is resized
   */
  useEffect(() => {
    if (!layout.includes('sidenav')) return
    const sn = document.querySelector('.mkui_sn')

    if (width && width < sideNav.breakpoint) {
      reset(true)
    } else if (width && width > sideNav.breakpoint) {
      reset()
    }

    if (width) {
      // TODO make this timeout dynamic based on sidenav.cssTransition
      setTimeout(() => {
        sn?.classList.remove('mkui_sn_init')
      }, 350)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  /**
   * Dismiss mobile side nav on route change
   */
  useEffect(() => {
    if (!sideNav.closeOnRouteChange) return
    if (!width || width > sideNav.breakpoint) return
    const menu = document.querySelector('.mkui_sn .mkui_collapse_menu')
    const click = (e: any) => {
      if (els.includes(e?.target?.localName)) {
        setMenu('sidenav', false)
      }
    }
    menu?.addEventListener('click', click)
    return () => menu?.removeEventListener('click', click)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Dismiss mobile menu on route change
   */
  useEffect(() => {
    if (!mobileMenu.closeOnRouteChange) return
    const menu = document.querySelector('.mkui_mobile_menu .mkui_collapse_menu')
    const click = (e: any) => {
      if (els.includes(e?.target?.localName)) {
        setMenu('menu', false)
      }
    }
    menu?.addEventListener('click', click)
    return () => menu?.removeEventListener('click', click)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Handle mobile menu overlay clicks
   */
  useEffect(() => {
    const o = document.querySelector('.mkui_overlay_m')
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
  useEffect(() => {
    const o = document.querySelector('.mkui_overlay_s')
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
   * Handle custom header scroll class
   */
  useEffect(() => {
    if (!scrollClass) return
    const header = document.querySelector('.mkui_header')
    if (!header) return
    if (selector.length) {
      header?.classList.add(selector)
    }
    if (!selector.length && header.classList.contains(scrollClass.className)) {
      header.classList.remove(scrollClass.className)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector])

  /**
   * Handle sticky upscroll effect
   */
  useEffect(() => {
    const header = document.querySelector('.mkui_header')
    // Don't run both effects at once
    if (header && !!stickyUpScroll) {
      if (show) {
        header.classList.remove('hide')
      } else {
        header.classList.add('hide')
      }
    }
  }, [stickyUpScroll, show])

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
    upScroll.active
  )

  /**
   * Fire hook effect if scrollClass !== undefined
   */
  useScrollPosition(
    ({ currPos }) => {
      if (scrollClass) {
        const { scrollTop, className } = scrollClass || {}
        const isActive = currPos > scrollTop ? className : ''
        if (isActive !== selector) {
          setSelector(isActive)
        }
      }
    },
    0,
    !!scrollClass
  )
  return <></>
}