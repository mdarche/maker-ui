import { useState, useEffect } from 'react'

/**
 * A React hook that adds a focus and blur event-listener to the window
 *
 * @param callback{(isFocused: boolean) => void} - a callback function that is invoked
 * each time the window is focused or blurred
 * @param active{boolean} - whether the hook should be active or not
 *
 * @returns a boolean that indicates if the window is focused
 */
export function useWindowFocus(
  callback: (isFocused: boolean) => void,
  active = true
) {
  const [isFocused, setIsFocused] = useState(true)

  useEffect(() => {
    if (!active) return

    const onFocus = (e: WindowEventMap['focus']) => {
      setIsFocused(true)
      callback(true)
    }

    const onBlur = (e: WindowEventMap['blur']) => {
      setIsFocused(false)
      callback(false)
    }

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [callback, active])

  useEffect(() => {
    if (!active) return
    if (!isFocused) {
      callback(false)
    }
  }, [isFocused, callback, active])

  return isFocused
}
