import * as React from 'react'
import { useStorage, type StorageProps } from '../src/useStorage'

interface Props {
  config: StorageProps
}

export const StorageComponent = ({
  config: { key, value, type, expires, expireDays },
}: Props) => {
  const stored = useStorage({
    key,
    value,
    type,
    expires,
    expireDays,
  })
  console.log('stored value is', stored)
  return (
    <div data-cy="store">
      {stored
        ? typeof stored === 'string'
          ? stored
          : JSON.stringify(stored)
        : 'initial'}
    </div>
  )
}

describe('useStorage', () => {
  const key = 'myKey'
  const value = 'myValue'
  const valueObject = { nested: 'myValue' }

  describe('local', () => {
    // Also test expiration
  })

  describe('session', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear())
    })
    it('returns false when item does not exist and no value is provided', () => {
      cy.window().then((w) => {
        cy.wrap(w.sessionStorage.getItem(key)).should('not.exist')
      })
      cy.mount(<StorageComponent config={{ key, type: 'session' }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', 'initial')
    })

    it('saves to session storage when item does not exist and value is provided', () => {
      cy.window().then((w) => {
        cy.wrap(w.sessionStorage.getItem(key)).should('not.exist')
      })
      cy.mount(<StorageComponent config={{ key, value, type: 'session' }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
    })

    it('saves and serializes an object to storage', () => {
      cy.window().then((w) => {
        cy.wrap(w.sessionStorage.getItem(key)).should('not.exist')
      })
      cy.mount(
        <StorageComponent
          config={{ key, value: valueObject, type: 'session' }}
        />
      )
      cy.wait(200)
      cy.get('[data-cy="store"]').should(
        'have.text',
        JSON.stringify(valueObject)
      )
    })

    describe('cookie', () => {})

    // it('expires the session storage item after one day', () => {
    //   cy.clock(Date.now())
    //   cy.window().then((win) => win.localStorage.clear())
    //   cy.wait(1000)
    //   cy.mount(<StorageComponent config={{ key, value, type: 'session' }} />)
    //   cy.wait(1000)
    //   cy.window().then((w) => {
    //     cy.wrap(w.localStorage.getItem(key)).should('exist')
    //   })
    //   cy.tick(86800000)
    //   // cy.reload(true)
    //   cy.window().then((w) => {
    //     cy.wrap(w.localStorage.getItem(key)).should('not.exist')
    //   })
    //   cy.clock().then((clock) => clock.restore())
    // })

    // it('returns the value when present in local storage', () => {
    //   cy.window().then((w) => {
    //     cy.mount(<StorageComponent config={{ key, value, type: 'session' }} />)
    //     cy.wrap(w.sessionStorage.getItem(key)).should('exist')
    //   })
    //   // cy.window().then((w) => {
    //   //   cy.wrap(w.sessionStorage.getItem(key)).should('exist')
    //   // })
    //   cy.wait(5000)
    //   // cy.get('[data-cy="store"]').should('have.text', 'my-key')
    //   // cy.window().then((win) => win.sessionStorage.clear())
    //   // cy.reload()
    //   // cy.get('[data-cy="store"]').should('have.text', 'my-key')
    // })
  })
})

// it('should set and get a cookie value', () => {
//   const key = 'my-key'
//   const value = 'my-value'
//   const options: StorageOptions = { type: 'cookie', expires: 1000 }
//   cy.wrap(value).as('initialValue')

//   cy.mount(() => {
//     const result = useStorage(key, value, options)
//     return <div>{result}</div>
//   })

//   cy.get('@initialValue').then((initialValue) => {
//     cy.get('div').contains(initialValue).should('be.visible')
//     cy.getCookie(key).should('have.property', 'value', value)
//   })
// })

// it('should return false if the cookie has expired', () => {
//   const key = 'my-key'
//   const value = 'my-value'
//   const options: StorageOptions = { type: 'cookie', expires: 1000 }
//   cy.wrap(value).as('initialValue')

//   cy.mount(() => {
//     const result = useStorage(key, value, options)
//     return <div>{result}</div>
//   })

//   cy.wait(1500) // Wait for the cookie to expire

//   cy.get('div').contains('false').should('be.visible')
// })

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
