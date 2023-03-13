import { useContext, useEffect, useMemo, useRef } from 'react'
import { LayoutContext } from '../components'

type MenuType =
  | 'mobile-menu'
  | 'side-nav-mobile'
  | 'side-nav-desktop'
  | 'ws-left'
  | 'ws-right'

export const useMenu = () => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const workspaceRef = useRef<HTMLDivElement | null>(null)

  const {
    state: { options, active },
    dispatch,
  } = useContext(LayoutContext)

  function setRefs(type: MenuType) {
    switch (type) {
      case 'mobile-menu':
        menuRef.current = document.querySelector('.mkui-mobile-menu')
        overlayRef.current = document.querySelector('.mkui-overlay-m')
        break
      case 'side-nav-mobile':
      case 'side-nav-desktop':
        menuRef.current = document.querySelector('.mkui-sn')
        overlayRef.current = document.querySelector('.mkui-overlay-s')
        break
      case 'ws-left':
      case 'ws-right':
        workspaceRef.current = document.querySelector('.mkui-workspace')
        overlayRef.current = document.querySelector('.mkui-overlay-w')
        if (type === 'ws-left') {
          menuRef.current = document.querySelector('.mkui-panel-left')
        } else {
          menuRef.current = document.querySelector('.mkui-panel-right')
        }
        break
      default:
        break
    }
  }

  const setMenu = useMemo(() => {
    function setMenu(value: boolean, type: MenuType) {
      setRefs(type)
      /**
       * MobileMenu
       */
      if (type === 'mobile-menu' && !options?.sideNav.isPrimaryMobileNav) {
        dispatch({ type: 'SET_MOBILE_MENU' })
        if (value) {
          menuRef?.current?.classList.add('active')
          overlayRef?.current?.classList.add('active')
        } else {
          menuRef?.current?.classList.remove('active')
          overlayRef?.current?.classList.remove('active')
        }
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
        console.log('here now', c, value)
        if (!value) {
          menuRef?.current?.classList.add(c)
          overlayRef?.current?.classList.remove('active')
        } else {
          menuRef?.current?.classList.remove(c)
          overlayRef?.current?.classList.add('active')
        }

        if (type === 'side-nav-desktop') {
          dispatch({ type: 'SET_SIDE_NAV_DESKTOP', value })
        } else {
          dispatch({ type: 'SET_SIDE_NAV_MOBILE', value })
        }
      }
      /** Handle workspace */
      if (type.includes('ws')) {
        if (value) {
          workspaceRef?.current?.classList.add(`${type}-active`)
          menuRef?.current?.classList.add('active')
          overlayRef?.current?.classList.add('active')
        } else {
          workspaceRef?.current?.classList.remove(`${type}-active`)
          overlayRef?.current?.classList.remove('active')
          menuRef?.current?.classList.remove('active')
        }
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
    function reset(mobile = true) {
      const sidenav = document.querySelector('.mkui-sn')
      const overlay_s = document.querySelector('.mkui-overlay-s')

      dispatch({ type: 'RESET' })
      if (mobile) {
        // Desktop to mobile
        console.log('Shrinking')
        sidenav?.classList.add('sn-hide')
        overlay_s?.classList.remove('active')
      } else {
        // Mobile to desktop
        console.log('Growing')
        sidenav?.classList.remove('sn-hide')
        sidenav?.classList.remove('sn-collapse')
      }
    }
    return reset
  }, [])

  return useMemo(() => {
    return { active, setMenu, reset }
  }, [active, setMenu, reset])
}
