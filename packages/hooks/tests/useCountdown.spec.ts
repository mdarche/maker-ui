import { renderHook } from '@testing-library/react'
import { useCountdown } from '../src/useCountdown'

describe('useCountdown', () => {
  it.only('should throw an error when no endDate is provided', () => {
    jest.spyOn(console, 'error')
    // @ts-ignore
    console.error.mockImplementation(() => null)
    expect(() =>
      renderHook(() => useCountdown(undefined as any, jest.fn()))
    ).toThrow(Error('endDate parameter is required'))
  })

  it.only('should throw an error when onCountdownEnd is not a function', () => {
    jest.spyOn(console, 'error')
    // @ts-ignore
    console.error.mockImplementation(() => null)
    //@ts-ignore
    expect(() => renderHook(() => useCountdown(new Date(), 0))).toThrow(
      Error('onCountdownEnd must be a function')
    )
  })

  // TODO - fix this test due to issue with Jest timers and react hooks
  test('should calculate countdown correctly', () => {
    jest.useFakeTimers('modern')
    const endDate = new Date(Date.now() + 10000) // 10 seconds from now
    const onCountdownEnd = jest.fn()
    const { result } = renderHook(() => useCountdown(endDate, onCountdownEnd))

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 10,
      expired: false,
    })

    jest.advanceTimersByTime(5000) // 5 seconds

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 5,
      expired: false,
    })

    jest.advanceTimersByTime(5000) // 5 seconds more

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    })

    expect(onCountdownEnd).toHaveBeenCalled()
    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    })
  })
  jest.useRealTimers()
})
