import { useCallback, useContext, useRef } from 'react'
import { LayoutContext } from '../components'

type MenuType = 'mobile-menu' | 'left-panel' | 'right-panel'

export const useMenu = () => {
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const overlayMobileRef = useRef<HTMLDivElement | null>(null)
  const overlayPanelRef = useRef<HTMLDivElement | null>(null)
  const leftPanelRef = useRef<HTMLDivElement | null>(null)
  const rightPanelRef = useRef<HTMLDivElement | null>(null)

  const context = useContext(LayoutContext)

  const validateContext = () => {
    if (!context) {
      throw new Error('useMenu must be used within a LayoutProvider component')
    }
  }
  validateContext()

  const {
    state: { options, active },
    dispatch,
  } = context

  const setRefs = useCallback(() => {
    if (!layoutRef.current) {
      layoutRef.current = document.querySelector('.mkui-layout')
      mobileMenuRef.current = document.querySelector('.mkui-mobile-menu')
      overlayMobileRef.current = document.querySelector('.mkui-overlay.mobile')
      overlayPanelRef.current = document.querySelector('.mkui-overlay.panel')
      leftPanelRef.current = document.querySelector('.mkui-panel.left')
      rightPanelRef.current = document.querySelector('.mkui-panel.right')
    }
  }, [])

  function toggleMobileMenu(value: boolean) {
    const action = value ? 'add' : 'remove'

    mobileMenuRef?.current?.classList[action]('active')
    overlayMobileRef?.current?.classList[action]('active')
  }

  function togglePanel(value: boolean, type: MenuType) {
    const t = type?.split('-')[0]
    const panelRef = type === 'left-panel' ? leftPanelRef : rightPanelRef
    const action = value ? 'add' : 'remove'

    layoutRef?.current?.classList[action](`${t}-active`)
    panelRef?.current?.classList[action]('active')
    overlayPanelRef?.current?.classList[action]('active')
  }

  const setMenu = useCallback(
    (value: boolean, type: MenuType) => {
      setRefs()
      if (type.includes('panel')) {
        togglePanel(value, type)
        return dispatch({
          type: 'SET_PANEL',
          value: {
            type: type === 'left-panel' ? 'leftPanel' : 'rightPanel',
            value,
          },
        })
      }

      if (options?.leftPanel?.primaryMobileNav) {
        togglePanel(value, 'left-panel')
        return dispatch({
          type: 'SET_PANEL',
          value: { type: 'leftPanel', value },
        })
      }

      if (options?.rightPanel?.primaryMobileNav) {
        togglePanel(value, 'right-panel')
        return dispatch({
          type: 'SET_PANEL',
          value: { type: 'rightPanel', value },
        })
      }

      toggleMobileMenu(value)
      return dispatch({ type: 'SET_MOBILE_MENU' })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  )

  return { active, setMenu }
}
