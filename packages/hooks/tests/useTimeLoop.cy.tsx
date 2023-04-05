import * as React from 'react'
import { useTimeLoop } from '../src'

/**
 * @hook
 * useTimeLoop
 *
 * @tests
 * - Invokes a callback function on timer completion
 * - Passes the params array to the callback function
 * - Can be paused, resumed, and restarted
 * - Pauses the timer when the window is blurred
 */

const TestComponent = ({
  duration = 1,
  maxRuns = 2,
  callback,
  params,
  pauseOnBlur,
}: {
  duration?: number
  maxRuns?: number
  callback?: () => void
  params?: any[]
  pauseOnBlur?: boolean
}) => {
  const { pause, restart, resume, runs } = useTimeLoop({
    duration,
    maxRuns,
    callback,
    params,
    pauseOnBlur,
  })
  return (
    <div>
      <div data-cy="runs">{runs}</div>
      <button data-cy="pause" onClick={pause}>
        Pause
      </button>
      <button data-cy="resume" onClick={resume}>
        Resume
      </button>
      <button data-cy="restart" onClick={restart}>
        Restart
      </button>
    </div>
  )
}

describe('useTimeLoop', () => {
  /* Invokes a callback function on timer completion */

  it('invokes a callback function on timer completion', () => {
    const callback = cy.stub()
    const maxRuns = 2
    cy.mount(<TestComponent callback={callback} maxRuns={maxRuns} />)
    cy.wait(1000)
    cy.get('[data-cy="runs"]').should('have.text', '1')
    cy.wrap(callback).should('have.been.calledTwice')
    cy.get('[data-cy="runs"]').should('have.text', maxRuns)
  })

  /* Passes the params array to the callback function */

  it('passes the params array to the callback function', () => {
    const callback = cy.stub()
    const params = ['one', 'two', 'three']
    cy.mount(<TestComponent callback={callback} params={params} />)
    cy.wait(1000)
    cy.wrap(callback).should(() => {
      const args = callback.getCall(0).thisValue
      expect(args).to.equal(params)
    })
  })

  /* Can be paused, resumed, and restarted */

  it('can be paused, resumed, and restarted', () => {
    cy.mount(<TestComponent />)
    cy.wait(1000)
    cy.get('[data-cy="runs"]').should('have.text', '1')
    cy.get('[data-cy="pause"]').click()
    cy.wait(1000)
    cy.get('[data-cy="runs"]').should('have.text', '1')
    cy.get('[data-cy="resume"]').click()
    cy.wait(1000)
    cy.get('[data-cy="runs"]').should('have.text', '2')
    cy.get('[data-cy="restart"]').click()
    cy.get('[data-cy="runs"]').should('have.text', '0')
  })

  /* Pauses the timer when the window is blurred with `pauseOnBlur` */

  it('pauses the timer when the window is blurred with pauseOnBlur', () => {
    cy.mount(<TestComponent pauseOnBlur />)
    cy.wait(1000)
    cy.get('[data-cy="runs"]').should('have.text', '1')
    cy.window().blur()
    cy.wait(1000)
    cy.get('[data-cy="runs"]').should('have.text', '1')
  })
})
