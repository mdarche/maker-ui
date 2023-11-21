import React, { useEffect, useRef, useState } from 'react'
import { useScrollPosition, useWindowSize } from '@maker-ui/hooks'
import { usePathname } from 'next/navigation'
import type { Options } from '@maker-ui/layout-server'

import { useMenu } from '../hooks'

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
    header: { stickyUpScroll, scrollClass },
    mobileMenu,
    leftPanel,
    rightPanel,
    content,
  },
}: EffectsProps) => {
  // Refs
  const headerRef = useRef<HTMLDivElement | null>(null)
  const overlayMobileRef = useRef<HTMLDivElement | null>(null)
  const overlayPanelRef = useRef<HTMLDivElement | null>(null)
  // Hooks
  const pathname = usePathname()
  const { active, setMenu } = useMenu()
  const { width } = useWindowSize()
  const [scrollSelector, setScrollSelector] = useState('')
  const [show, setShow] = useState(true)
  // Helpers
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
   * Set all necessary HTML element references
   */
  useEffect(() => {
    headerRef.current = document.querySelector('.mkui-header')
    overlayMobileRef.current = document.querySelector('.mkui-overlay.o-mobile')
    overlayPanelRef.current = document.querySelector('.mkui-overlay.o-layout')
  }, [])

  /**
   * Remove all instances of mkui-layout-init class on first render
   */
  useEffect(() => {
    const init = document.querySelectorAll('.mkui-layout-init')
    init.forEach((el) => el.classList.remove('mkui-layout-init'))
  }, [])

  /**
   * Dismiss MobileMenu and mobile SideNav on route change
   */
  useEffect(() => {
    if (mobileMenu.closeOnRouteChange && active?.mobileMenu) {
      setMenu(false, 'mobile-menu')
    }

    // Dismiss panels on mobile

    if (!width || width > content.breakpoint) return

    if (leftPanel?.closeOnRouteChange && active?.leftPanel) {
      setMenu(false, 'left-panel')
    }

    if (rightPanel?.closeOnRouteChange && active?.rightPanel) {
      setMenu(false, 'right-panel')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /**
   * Handle overlay clicks
   */
  useEffect(() => {
    const mobileClick = () => {
      if (mobileMenu.closeOnBlur) {
        setMenu(false, 'mobile-menu')
      }
    }

    const workspaceClick = () => {
      setMenu(false, 'left-panel')
      setMenu(false, 'right-panel')
    }

    overlayMobileRef?.current?.addEventListener('click', mobileClick)
    overlayPanelRef?.current?.addEventListener('click', workspaceClick)
    return () => {
      overlayMobileRef?.current?.removeEventListener('click', mobileClick)
      overlayPanelRef?.current?.removeEventListener('click', workspaceClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Handle custom header scroll class
   */
  useEffect(() => {
    if (!scrollClass) return
    if (scrollSelector.length) {
      headerRef?.current?.classList.add(scrollSelector)
    }
    if (
      !scrollSelector.length &&
      headerRef?.current?.classList.contains(scrollClass.className)
    ) {
      headerRef?.current?.classList.remove(scrollClass.className)
    }
  }, [scrollSelector, scrollClass])

  /**
   * Handle sticky upscroll effect
   */
  useEffect(() => {
    const header = document.querySelector('.mkui-header')
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
        if (isActive !== scrollSelector) {
          setScrollSelector(isActive)
        }
      }
    },
    0,
    !!scrollClass
  )
  return <></>
}
