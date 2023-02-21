// import { renderHook } from '@testing-library/react'
// import { useStorage } from '../src/useStorage'

// describe('useStorage', () => {
//   beforeEach(() => {
//     window.sessionStorage.clear()
//     document.cookie.split(';').forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, '')
//         .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
//     })
//   })

//   describe('with default options', () => {
//     it('returns the initial value if no value is in storage', () => {
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value')
//       )
//       expect(result.current).toEqual('initial-value')
//     })

//     it('returns the value from session storage if it exists', () => {
//       window.sessionStorage.setItem('test-key', 'session-value')
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value')
//       )
//       expect(result.current).toEqual('session-value')
//     })

//     it('returns the value from cookie storage if it exists', () => {
//       document.cookie = 'test-key=cookie-value'
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value')
//       )
//       expect(result.current).toEqual('cookie-value')
//     })

//     it('sets the value to session storage when it changes', () => {
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value')
//       )
//       expect(window.sessionStorage.getItem('test-key')).toEqual('initial-value')
//       result.current[1]('new-session-value')
//       expect(window.sessionStorage.getItem('test-key')).toEqual(
//         'new-session-value'
//       )
//     })

//     it('sets the value to cookie storage when it changes', () => {
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value', { type: 'cookie' })
//       )
//       expect(document.cookie).toContain('test-key=initial-value')
//       result.current[1]('new-cookie-value')
//       expect(document.cookie).toContain('test-key=new-cookie-value')
//     })

//     it('expires the session storage item after one day', () => {
//       window.sessionStorage.setItem(
//         'test-key',
//         JSON.stringify({
//           value: 'session-value',
//           expireTime: new Date().getTime() - 1000, // make it already expired
//         })
//       )
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value')
//       )
//       expect(result.current).toBeFalsy()
//       expect(window.sessionStorage.getItem('test-key')).toBeFalsy()
//     })

//     it('expires the cookie after one day', () => {
//       document.cookie = `test-key=${JSON.stringify({
//         value: 'cookie-value',
//         expireTime: new Date().getTime() - 1000, // make it already expired
//       })};expires=${new Date().toUTCString()};path=/`
//       const { result } = renderHook(() =>
//         useStorage('test-key', 'initial-value', { type: 'cookie' })
//       )
//       expect(result.current).toBeFalsy()
//       expect(document.cookie).not.toContain('test-key=cookie-value')
//     })
//   })
// })
