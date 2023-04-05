import * as React from 'react'
import { useCountdown } from '../src/useCountdown'

/**
 * @hook
 * useCountdown
 *
 * @tests
 * - Error: endDate parameter is required
 * - Error: `onCountdownEnd` must be a function
 * - Handles `endDate` that has passed
 * - Invokes callback when countdown ends
 */

const TestComponent = ({
  time,
  onCountdownEnd,
}: {
  time?: Date
  onCountdownEnd?: () => void
}) => {
  const { days, hours, minutes, seconds, expired } = useCountdown(
    time,
    onCountdownEnd
  )
  return (
    <div>
      <div data-cy="days">{days}</div>
      <div data-cy="hours">{hours}</div>
      <div data-cy="minutes">{minutes}</div>
      <div data-cy="seconds">{seconds}</div>
      <div data-cy="expired">{expired ? 'true' : 'false'}</div>
    </div>
  )
}

describe('useCountdown', () => {
  /* Error: endDate parameter is required */

  it('throws an error when no endDate is provided', () => {
    cy.mount(<TestComponent />)
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('endDate parameter is required')
      return false
    })
  })

  /* Error: `onCountdownEnd` must be a function */

  it('throws an error when onCountdownEnd is not a function', () => {
    const date = new Date()
    //@ts-ignore
    cy.mount(<TestComponent time={date} onCountdownEnd={1} />)
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('onCountdownEnd must be a function')
      return false
    })
  })

  /* Returns the correct time difference */

  it('mounts a count down with the correct time', () => {
    cy.clock(Date.now())
    let endDate = new Date(Date.now() + 86400000) // 1 day from now
    cy.mount(<TestComponent time={endDate} />)
    cy.tick(1000)
    cy.get('[data-cy="days"]').should('have.text', '0')
    cy.get('[data-cy="hours"]').should('have.text', '23')
    cy.clock().then((clock) => clock.restore())
  })

  /* Handles endDate that has passed */

  it('counts down to 0', () => {
    cy.clock(Date.now())
    let endDate = new Date(Date.now() + 10000) // 10 seconds from now
    cy.mount(<TestComponent time={endDate} />)
    cy.get('[data-cy="seconds"]').should('have.text', '10')
    cy.tick(1000)
    cy.get('[data-cy="seconds"]').should('have.text', '9')
    cy.tick(11000)
    cy.get('[data-cy="seconds"]').should('have.text', '0')
    cy.get('[data-cy="expired"]').should('have.text', 'true')
    cy.clock().then((clock) => clock.restore())
  })

  /* Invokes callback when countdown ends */

  it('calls onCountdownEnd when the countdown ends', () => {
    let onCountdownEnd = cy.stub().as('onCountdownEnd')
    cy.clock(Date.now())
    let endDate = new Date(Date.now() + 10000) // 10 seconds from now
    cy.mount(<TestComponent time={endDate} onCountdownEnd={onCountdownEnd} />)
    cy.tick(11000)
    cy.get('[data-cy="expired"]').should('have.text', 'true')
    cy.get('@onCountdownEnd').should('have.been.calledOnce')
    cy.clock().then((clock) => clock.restore())
  })
})
