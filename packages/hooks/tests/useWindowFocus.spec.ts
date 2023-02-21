import { renderHook, act } from '@testing-library/react'
import { useWindowFocus } from '../src/useWindowFocus'

describe('useWindowFocus', () => {
  it('should set isFocused to true when window is focused', () => {
    const callback = jest.fn()
    renderHook(() => useWindowFocus(callback))

    act(() => {
      const event = new Event('focus')
      window.dispatchEvent(event)
    })

    expect(callback).toHaveBeenCalledWith(true)
  })

  it('should set isFocused to false when window is blurred', () => {
    const callback = jest.fn()
    renderHook(() => useWindowFocus(callback))

    act(() => {
      const event = new Event('blur')
      window.dispatchEvent(event)
    })

    expect(callback).toHaveBeenCalledWith(false)
  })

  it('should return true when window is focused', () => {
    const { result } = renderHook(() => useWindowFocus(() => {}))

    act(() => {
      const event = new Event('focus')
      window.dispatchEvent(event)
    })

    expect(result.current).toBe(true)
  })

  it('should return false when window is blurred', () => {
    const { result } = renderHook(() => useWindowFocus(() => {}))

    act(() => {
      const event = new Event('blur')
      window.dispatchEvent(event)
    })

    expect(result.current).toBe(false)
  })

  it('should not call the callback when the hook is inactive', () => {
    const callback = jest.fn()
    renderHook(() => useWindowFocus(callback, false))

    act(() => {
      const event = new Event('blur')
      window.dispatchEvent(event)
    })

    expect(callback).not.toHaveBeenCalled()
  })

  it('should call the callback when the hook is reactivated', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(
      ({ active }) => useWindowFocus(callback, active),
      {
        initialProps: { active: false },
      }
    )

    rerender({ active: true })
    act(() => {
      const event = new Event('focus')
      window.dispatchEvent(event)
    })

    expect(callback).toHaveBeenCalledWith(true)
  })
})
