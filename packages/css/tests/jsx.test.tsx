/** @jsx jsx */
import { jsx } from '../src/jsx-runtime'
import { createSerializer } from '@emotion/jest'
import { ThemeProvider } from '@emotion/react'
import renderer from 'react-test-renderer'

expect.addSnapshotSerializer(createSerializer())

const Button = (props: any) => <button {...props} />

/**
 * It's difficult to test for media queries. Snapshot testing isn't ideal
 * but Emotion recommends this approach with their @emotion/jest library.
 *
 * @remarks
 * - This test suite is for testing responsive JSX pragma only.
 * - @maker-ui/layout tests for media query / responsive accuracy with Cypress
 * - @maker-ui/primitives package doesn't test for media queries
 */

describe('Custom jsx function', () => {
  test('jsx renders an Emotion component', () => {
    const json = renderer.create(<Button>Test button</Button>).toJSON()

    expect(json).toMatchSnapshot()
  })

  test('identifies and parses the css prop', () => {
    const json = renderer
      .create(<Button css={{ color: 'hotpink' }}>Test button</Button>)
      .toJSON()

    expect(json).toMatchSnapshot()
  })

  test('identifies and parses the breakpoints prop', () => {
    const json = renderer
      .create(
        <Button
          breakpoints={[680, '90vw']}
          css={{ color: ['hotpink', 'red', 'black'] }}>
          Test button
        </Button>
      )
      .toJSON()

    expect(json).toMatchSnapshot()
  })

  test('uses the ThemeProvider default breakpoints if none are specified', () => {
    const json = renderer
      .create(
        <ThemeProvider theme={{ breakpoints: [480, 620] }}>
          <Button css={{ color: ['hotpink', 'red', 'black'] }}>
            Test button
          </Button>
        </ThemeProvider>
      )
      .toJSON()

    expect(json).toMatchSnapshot()
  })

  test('uses default breakpoints if no theme or breakpoints are specified', () => {
    const json = renderer
      .create(
        <Button css={{ color: ['hotpink', 'red', 'black'] }}>
          Test button
        </Button>
      )
      .toJSON()

    expect(json).toMatchSnapshot()
  })
})
