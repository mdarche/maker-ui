import React, { useEffect, useRef, useState } from 'react'
import { useScrollPosition, useWindowSize } from '@maker-ui/hooks'
import type { Options } from '@maker-ui/layout-server'

import { useMenu } from '../hooks'
import { usePathname } from 'next/navigation'

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

interface DesktopState {
  sideNav: boolean
  workspace: boolean
  measured: boolean
}

export const Effects = ({
  options: {
    layout,
    header: { stickyUpScroll, scrollClass },
    mobileMenu,
    sideNav,
    workspace,
  },
}: EffectsProps) => {
  // Refs
  const [isDesktop, setIsDesktop] = useState<DesktopState>({
    sideNav: true,
    workspace: true,
    measured: false,
  })
  const headerRef = useRef<HTMLDivElement | null>(null)
  const overlayMobileRef = useRef<HTMLDivElement | null>(null)
  const overlaySideNavRef = useRef<HTMLDivElement | null>(null)
  const overlayWorkspaceRef = useRef<HTMLDivElement | null>(null)
  // Hooks
  const pathname = usePathname()
  const { reset, active, setMenu } = useMenu()
  const { width } = useWindowSize(() => {
    console.log('Calling thisss')
    if (!width) return
    // Handle SideNav on resize
    if (
      layout.includes('sidenav') &&
      width < sideNav.breakpoint &&
      isDesktop.sideNav
    ) {
      setIsDesktop({ ...isDesktop, sideNav: false })
    } else if (width > sideNav.breakpoint && !isDesktop.sideNav) {
      setIsDesktop({ ...isDesktop, sideNav: true })
    }
    // Handle Workspace on resize
    if (
      layout === 'workspace' &&
      width < workspace.breakpoint &&
      isDesktop.workspace
    ) {
      setIsDesktop({ ...isDesktop, workspace: false })
    } else if (width > workspace.breakpoint && !isDesktop.workspace) {
      setIsDesktop({ ...isDesktop, workspace: true })
    }
  })
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

  useEffect(() => {
    if (layout.includes('sidenav')) {
      reset('side-nav', isDesktop.sideNav ? 'desktop' : 'mobile')
    }

    if (layout === 'workspace') {
      reset('workspace', isDesktop.workspace ? 'desktop' : 'mobile')
    }
  }, [isDesktop])

  /**
   * Set all necessary HTML element references
   */
  useEffect(() => {
    headerRef.current = document.querySelector('.mkui-header')
    overlayMobileRef.current = document.querySelector('.mkui-overlay-m')
    overlaySideNavRef.current = document.querySelector('.mkui-overlay-s')
    overlayWorkspaceRef.current = document.querySelector('.mkui-overlay-w')
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
    if (!width || width > sideNav.breakpoint) return

    if (sideNav.closeOnRouteChange && active?.sideNavMobile) {
      setMenu(false, 'side-nav-mobile')
    }

    if (mobileMenu.closeOnRouteChange && active?.mobileMenu) {
      setMenu(false, 'mobile-menu')
    }
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

    const sideNavClick = () => {
      if (sideNav.closeOnBlur) {
        setMenu(false, 'side-nav-mobile')
      }
    }

    const workspaceClick = () => {
      if (workspace.closeOnBlur) {
        setMenu(false, 'ws-left')
        setMenu(false, 'ws-right')
      }
    }

    overlayMobileRef?.current?.addEventListener('click', mobileClick)
    overlaySideNavRef?.current?.addEventListener('click', sideNavClick)
    overlayWorkspaceRef?.current?.addEventListener('click', workspaceClick)
    return () => {
      overlayMobileRef?.current?.removeEventListener('click', mobileClick)
      overlaySideNavRef?.current?.removeEventListener('click', sideNavClick)
      overlayWorkspaceRef?.current?.removeEventListener('click', workspaceClick)
    }
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
  }, [scrollSelector])

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
