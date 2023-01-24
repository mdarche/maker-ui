import { useContext } from 'react'
import { ToastContext } from '@/components'
import type { ToastProps } from '@/types'

/**
 * React hook for using the Toast component throughout the application
 */
export function useToast() {
  const { state, dispatch } = useContext(ToastContext)

  /**
   * Renders the toast notification at the bottom of the window
   *
   * @param {ToastState['type']} type the toast type
   * @param {string} message an optional custom toast message
   * @param {React.ReactElement} icon an optional React Element (ie. svg or custom div)
   * @param {React.ReactElement} component an optional React Element (ie. svg or custom div)
   * @returns {void}
   */
  function toast(props: Partial<ToastProps>) {
    dispatch({ type: 'CREATE', value: props })
  }

  function setInactive(id: string) {
    dispatch({ type: 'INACTIVE', value: id })
  }

  return {
    toast,
    icons: state.icons,
    history: state.history,
    classNames: state.classNames,
    components: state.components,
    setInactive,
  }
}
