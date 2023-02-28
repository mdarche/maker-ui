/// <reference types="jest" />

import { parseArrays, formatCSS } from '../src/css'
import { objectToCSS } from '../src/transformer'

describe('parseArrays', () => {
  it('returns the same object if no values are arrays', () => {
    const input = {
      color: 'red',
      fontSize: 16,
    }
    const output = parseArrays(input)
    expect(output).toEqual(input)
  })

  it('formats arrays as media queries with default breakpoints', () => {
    const input = {
      color: ['red', 'blue', 'green', 'orange'],
    }
    const output = parseArrays(input)
    expect(output).toEqual({
      color: 'red',
      '@media screen and (min-width: 1440px)': { color: 'orange' },
      '@media screen and (min-width: 960px)': { color: 'green' },
      '@media screen and (min-width: 768px)': { color: 'blue' },
    })
  })

  it('formats arrays as media queries with custom breakpoints', () => {
    const input = {
      color: ['red', 'blue', 'green', 'orange'],
    }
    const output = parseArrays(input, ['500px', '700px', '900px'])
    expect(output).toEqual({
      color: 'red',
      '@media screen and (min-width: 900px)': { color: 'orange' },
      '@media screen and (min-width: 700px)': { color: 'green' },
      '@media screen and (min-width: 500px)': { color: 'blue' },
    })
  })

  it('throws an error if the style rule exceeds the number of breakpoints', () => {
    const input = {
      color: ['red', 'blue', 'green', 'orange'],
    }
    expect(() => parseArrays(input, ['500px', '900px'])).toThrow(
      'The number of style rules must be equal to or less than the number of breakpoints'
    )
  })

  it('combines media queries with the same breakpoint', () => {
    const input = {
      color: ['red', 'blue', 'green'],
      fontSize: [20, 30],
      border: 'none',
      padding: [10, 20, 30, 40],
    }
    const output = parseArrays(input)
    expect(output).toEqual({
      color: 'red',
      fontSize: 20,
      border: 'none',
      padding: 10,
      '@media screen and (min-width: 1440px)': { padding: 40 },
      '@media screen and (min-width: 960px)': { color: 'green', padding: 30 },
      '@media screen and (min-width: 768px)': {
        color: 'blue',
        fontSize: 30,
        padding: 20,
      },
    })
  })

  it('converts number breakpoints into pixel values', () => {
    const input = {
      color: ['red', 'blue', 'green', 'purple'],
    }
    const output = parseArrays(input, [500, 700, 800])
    console.log('output', output)
    // expect(output).toEqual({
    //   color: 'red',
    //   '@media screen and (min-width: 500px)': { color: 'blue' },
    //   '@media screen and (min-width: 700px)': { color: 'green' },
    // })
  })
})

describe('formatCSS', () => {})

describe('objectToCSS', () => {})
