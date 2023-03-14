import { useCallback, useContext, useMemo, useRef } from 'react'
import { LayoutContext } from '../components'

type MenuType =
  | 'mobile-menu'
  | 'side-nav-mobile'
  | 'side-nav-desktop'
  | 'ws-left'
  | 'ws-right'

export const useMenu = () => {
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const sideNavRef = useRef<HTMLDivElement | null>(null)
  const workspaceRef = useRef<HTMLDivElement | null>(null)
  const overlayMobileRef = useRef<HTMLDivElement | null>(null)
  const overlaySideNavRef = useRef<HTMLDivElement | null>(null)
  const overlayWorkspaceRef = useRef<HTMLDivElement | null>(null)
  const leftPanelRef = useRef<HTMLDivElement | null>(null)
  const rightPanelRef = useRef<HTMLDivElement | null>(null)

  const {
    state: { options, active },
    dispatch,
  } = useContext(LayoutContext)

  const setRefs = useCallback(() => {
    mobileMenuRef.current = document.querySelector('.mkui-mobile-menu')
    overlayMobileRef.current = document.querySelector('.mkui-overlay-m')
    sideNavRef.current = document.querySelector('.mkui-sn')
    overlaySideNavRef.current = document.querySelector('.mkui-overlay-s')
    workspaceRef.current = document.querySelector('.mkui-workspace')
    overlayWorkspaceRef.current = document.querySelector('.mkui-overlay-w')
    leftPanelRef.current = document.querySelector('.mkui-panel-left')
    rightPanelRef.current = document.querySelector('.mkui-panel-right')
  }, [])

  function toggleMobileMenu(value: boolean) {
    if (value) {
      mobileMenuRef?.current?.classList.add('active')
      overlayMobileRef?.current?.classList.add('active')
    } else {
      mobileMenuRef?.current?.classList.remove('active')
      overlayMobileRef?.current?.classList.remove('active')
    }
  }

  function toggleSideNav(value: boolean, selector: string) {
    if (value) {
      sideNavRef?.current?.classList.remove(selector)
      overlaySideNavRef?.current?.classList.add('active')
    } else {
      sideNavRef?.current?.classList.add(selector)
      overlaySideNavRef?.current?.classList.remove('active')
    }
  }

  function togglePanel(value: boolean, type: MenuType) {
    if (value) {
      workspaceRef?.current?.classList.add(`${type}-active`)
      ;(type === 'ws-left'
        ? leftPanelRef
        : rightPanelRef
      )?.current?.classList.add('active')
      overlayWorkspaceRef?.current?.classList.add('active')
    } else {
      workspaceRef?.current?.classList.remove(`${type}-active`)
      overlayWorkspaceRef?.current?.classList.remove('active')
      ;(type === 'ws-left'
        ? leftPanelRef
        : rightPanelRef
      )?.current?.classList.remove('active')
    }
  }

  const setMenu = useMemo(() => {
    function setMenu(value: boolean, type: MenuType) {
      setRefs()
      /**
       * MobileMenu
       */
      if (type === 'mobile-menu' && !options?.sideNav.isPrimaryMobileNav) {
        toggleMobileMenu(value)
        dispatch({ type: 'SET_MOBILE_MENU' })
      }

      /**
       * SideNav
       */
      if (
        (type === 'mobile-menu' && options?.sideNav.isPrimaryMobileNav) ||
        type === 'side-nav-mobile' ||
        type === 'side-nav-desktop'
      ) {
        const c = type === 'side-nav-desktop' ? 'sn-collapse' : 'sn-hide'
        toggleSideNav(value, c)
        if (type === 'side-nav-desktop') {
          dispatch({ type: 'SET_SIDE_NAV_DESKTOP', value })
        } else {
          dispatch({ type: 'SET_SIDE_NAV_MOBILE', value })
        }
      }
      /**
       * Workspace
       */
      if (type.includes('ws')) {
        togglePanel(value, type)
        dispatch({
          type: 'SET_WORKSPACE',
          value: {
            type: type === 'ws-left' ? 'workspaceLeft' : 'workspaceRight',
            value,
          },
        })
      }
    }
    return setMenu
  }, [])

  const reset = useMemo(() => {
    function reset(type: 'side-nav' | 'workspace', size: 'mobile' | 'desktop') {
      setRefs()
      // Desktop to mobile
      if (size === 'mobile') {
        if (type === 'side-nav') {
          toggleSideNav(false, 'sn-hide')
        }
        if (type === 'workspace') {
          togglePanel(false, 'ws-left')
          togglePanel(false, 'ws-right')
        }
        dispatch({
          type: 'RESET',
          value: {
            mobileMenu: false,
            sideNavMobile: false,
            sideNavDesktop: false,
            workspaceLeft: false,
            workspaceRight: false,
          },
        })
      } else {
        // Mobile to desktop
        if (type === 'side-nav') {
          sideNavRef?.current?.classList.remove('sn-hide')
          sideNavRef?.current?.classList.remove('sn-collapse')
        }
        if (type === 'workspace') {
          togglePanel(true, 'ws-left')
          togglePanel(true, 'ws-right')
        }
        dispatch({
          type: 'RESET',
          value: {
            mobileMenu: false,
            sideNavMobile: false,
            sideNavDesktop: true,
            workspaceLeft: true,
            workspaceRight: true,
          },
        })
      }
    }
    return reset
  }, [])

  return useMemo(() => {
    return { active, setMenu, reset }
  }, [active, setMenu, reset])
}
