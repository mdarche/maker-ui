import { renderHook, act } from '@testing-library/react'
import { useWindowSize } from '../src/useWindowSize'

const mockDelay = (delay: number): Promise<string> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, delay)
  })

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'))
}

describe('useWindowSize', () => {
  it('should return the initial window size', () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })

  it('should update the window size on resize', async () => {
    const { result } = renderHook(() => useWindowSize())
    act(() => {
      window.resizeTo(500, 500)
    })
    await mockDelay(300)
    expect(result.current.height).toBe(500)
    expect(result.current.width).toBe(500)
  })

  it('should call the callback function on resize', async () => {
    const mockCallback = jest.fn()
    renderHook(() => useWindowSize(mockCallback))
    act(() => {
      window.resizeTo(400, 700)
    })
    await mockDelay(300)
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})
