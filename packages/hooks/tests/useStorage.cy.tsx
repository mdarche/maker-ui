import * as React from 'react'
import { useStorage, type StorageProps } from '../src/useStorage'

interface Props {
  config: StorageProps
  toggleValue?: boolean
}

export const StorageComponent = ({
  config: { key, value, type, expires, expireDays },
  toggleValue = false,
}: Props) => {
  const [val, setVal] = React.useState(value)
  const stored = useStorage({
    key,
    value: val,
    type,
    expires,
    expireDays,
  })
  return (
    <div>
      <div data-cy="store">
        {stored
          ? typeof stored === 'string'
            ? stored
            : JSON.stringify(stored)
          : 'initial'}
      </div>
      {toggleValue && (
        <button onClick={() => setVal('new')}>Change Value</button>
      )}
    </div>
  )
}

describe('useStorage', () => {
  const key = 'myKey'
  const value = 'myValue'
  const valueObject = { nested: 'myValue' }

  // LOCAL STORAGE
  describe('local', () => {
    it('returns false when item does not exist and no value is provided', () => {
      cy.window().then((win) => win.localStorage.clear())
      cy.mount(<StorageComponent config={{ key }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', 'initial')
    })

    it('saves to local storage when item does not exist and value is provided', () => {
      const defaultExpiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days
      cy.mount(<StorageComponent config={{ key, value }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
      // Check for the default expiry within 2 second range
      cy.window().then((w) => {
        console.log(w.localStorage.getItem(key))
        //@ts-ignore
        cy.wrap(JSON.parse(w.localStorage.getItem(key)).expires).should(
          'be.within',
          defaultExpiry - 2000,
          defaultExpiry + 2000
        )
      })
    })

    it('saves and serializes an object to local storage', () => {
      cy.window().then((win) => win.localStorage.clear())
      cy.window().then((w) => {
        cy.wrap(w.localStorage.getItem(key)).should('not.exist')
      })
      cy.mount(<StorageComponent config={{ key, value: valueObject }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should(
        'have.text',
        JSON.stringify(valueObject)
      )
    })

    it('updates the local storage item when the value changes', () => {
      cy.mount(
        <StorageComponent config={{ key, value, type: 'local' }} toggleValue />
      )
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.get('button').click()
      cy.get('[data-cy="store"]').should('have.text', 'new')
    })

    it('returns false and deletes the item when it expires and no value is present', () => {
      cy.window().then((w) => window.localStorage.clear())
      cy.mount(
        <StorageComponent
          config={{
            key,
            value,
            expires: new Date().getTime() + 500,
          }}
        />
      )
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.wait(1000)
      cy.mount(<StorageComponent config={{ key, type: 'local' }} />)
      cy.get('[data-cy="store"]').should('have.text', 'initial')
      cy.window().then((w) => {
        cy.wrap(w.localStorage.getItem(key)).should('not.exist')
      })
    })

    it('sets a new value with expiry when item has expired and value is present', () => {
      cy.window().then((w) => window.localStorage.clear())
      cy.mount(
        <StorageComponent
          config={{
            key,
            value,
            expires: new Date().getTime() + 500,
          }}
        />
      )
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.wait(1000)
      const newExpire = new Date().getTime() + 10000
      cy.mount(
        <StorageComponent
          config={{ key, value: 'new', type: 'local', expires: newExpire }}
        />
      )
      cy.get('[data-cy="store"]').should('have.text', 'new')
      cy.window().then((w) => {
        //@ts-ignore
        cy.wrap(JSON.parse(w.localStorage.getItem(key)).expires).should(
          'eq',
          newExpire
        )
      })
    })
  })

  // SESSION STORAGE
  describe('session', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear())
    })

    it('returns false when item does not exist and no value is provided', () => {
      cy.mount(<StorageComponent config={{ key, type: 'session' }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', 'initial')
    })

    it('saves to session storage when item does not exist and value is provided', () => {
      cy.mount(<StorageComponent config={{ key, value, type: 'session' }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
    })

    it('saves and serializes an object to session storage', () => {
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

    it('updates the session storage item when the value changes', () => {
      cy.mount(
        <StorageComponent
          config={{ key, value, type: 'session' }}
          toggleValue
        />
      )
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.get('button').click()
      cy.get('[data-cy="store"]').should('have.text', 'new')
    })
  })

  // BROWSER COOKIES
  describe.only('cookie', () => {
    beforeEach(() => {
      cy.clearCookies()
    })

    it('returns false when item does not exist and no value is provided', () => {
      cy.mount(<StorageComponent config={{ key, type: 'cookie' }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', 'initial')
    })

    it('saves a new cookie when item does not exist and value is provided', () => {
      const defaultExpiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days
      cy.mount(<StorageComponent config={{ key, value, type: 'cookie' }} />)
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
      // Check for the default expiry within 2 second range
      cy.getCookie(key).should((t) => {
        // t.expiry returns as unix timestamp, so * 1000
        expect(t.expiry * 1000).to.be.within(
          defaultExpiry - 2000,
          defaultExpiry + 2000
        )
      })
    })

    it('saves and serializes an object as a cookie', () => {
      cy.mount(
        <StorageComponent
          config={{ key, value: valueObject, type: 'cookie' }}
        />
      )
      cy.wait(200)
      cy.get('[data-cy="store"]').should(
        'have.text',
        JSON.stringify(valueObject)
      )
    })

    it('updates cookie when the value changes', () => {
      cy.mount(
        <StorageComponent config={{ key, value, type: 'cookie' }} toggleValue />
      )
      cy.wait(200)
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.get('button').click()
      cy.get('[data-cy="store"]').should('have.text', 'new')
    })

    it('returns false when the item expires and no value is present', () => {
      cy.mount(
        <StorageComponent
          config={{
            key,
            value,
            type: 'cookie',
            expires: new Date().getTime() + 500,
          }}
        />
      )
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.wait(600)
      cy.mount(<StorageComponent config={{ key, type: 'cookie' }} />)
      cy.get('[data-cy="store"]').should('have.text', 'initial')
      cy.getCookie(key).should('not.exist')
    })

    it.only('sets a new value with expiry when item has expired and value is present', () => {
      const firstExpiry = new Date().getTime() + 500
      cy.mount(
        <StorageComponent
          config={{
            key,
            value,
            type: 'cookie',
            expires: firstExpiry,
          }}
        />
      )
      cy.get('[data-cy="store"]').should('have.text', value)
      cy.wait(600)
      const newExpire = new Date().getTime() + 10000
      cy.mount(
        <StorageComponent
          config={{ key, value: 'new', type: 'cookie', expires: newExpire }}
        />
      )
      cy.get('[data-cy="store"]').should('have.text', 'new')
      cy.getCookie(key).should((t) => {
        expect(t.expiry * 1000).to.not.eq(firstExpiry)
      })
    })
  })
})
