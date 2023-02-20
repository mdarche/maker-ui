import { renderHook } from '@testing-library/react'
import { useScrollPosition } from '../src/useScrollPosition'

describe('useScrollPosition', () => {
  it('calls the onScroll callback on scroll', () => {
    const onScrollMock = jest.fn()
    renderHook(() => useScrollPosition(onScrollMock, 0))
    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)
    expect(onScrollMock).toHaveBeenCalledTimes(1)
    expect(onScrollMock).toHaveBeenCalledWith({
      prevPos: 0,
      currPos: expect.any(Number),
    })
  })

  it('does not call the onScroll callback when inactive', () => {
    const onScrollMock = jest.fn()

    renderHook(() => useScrollPosition(onScrollMock, 0, false))

    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)

    expect(onScrollMock).not.toHaveBeenCalled()
  })

  it('calls the onScroll callback after the specified wait time', async () => {
    const onScrollMock = jest.fn()
    jest.useFakeTimers()

    renderHook(() => useScrollPosition(onScrollMock, 1000, true))
    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)
    expect(onScrollMock).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(onScrollMock).toHaveBeenCalledTimes(1)
    expect(onScrollMock).toHaveBeenCalledWith({
      prevPos: 0,
      currPos: expect.any(Number),
    })
  })

  it('should update position.current with current position', () => {
    const onScrollMock = jest.fn()

    renderHook(() => useScrollPosition(onScrollMock, 0, true))
    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)
    expect(onScrollMock).toHaveBeenCalledTimes(1)
    expect(onScrollMock).toHaveBeenCalledWith({
      prevPos: 0,
      currPos: expect.any(Number),
    })
    window.dispatchEvent(scrollEvent)
    expect(onScrollMock).toHaveBeenCalledTimes(2)
    expect(onScrollMock).toHaveBeenCalledWith({
      prevPos: expect.any(Number),
      currPos: expect.any(Number),
    })
  })
})
