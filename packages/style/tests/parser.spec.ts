/// <reference types="jest" />

import { parseArrays } from '../src/css'
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
    expect(output).toEqual({
      color: 'red',
      '@media screen and (min-width: 800px)': { color: 'purple' },
      '@media screen and (min-width: 700px)': { color: 'green' },
      '@media screen and (min-width: 500px)': { color: 'blue' },
    })
  })

  it('ignores nested / deeply nested objects and non-array values', () => {
    const input = {
      color: ['red', 'blue'],
      fontSize: 16,
      a: {
        color: 'green',
        svg: {
          color: ['red', 'blue'],
        },
      },
    }
    const output = parseArrays(input)
    expect(output).toEqual({
      color: 'red',
      fontSize: 16,
      a: {
        color: 'green',
        svg: {
          color: ['red', 'blue'],
        },
      },
      '@media screen and (min-width: 768px)': { color: 'blue' },
    })
  })
})

describe('objectToCSS', () => {
  const root = 'test'
  it('converts a basic style object to a CSS string', () => {
    const input = {
      color: 'red',
    }
    const output = objectToCSS(root, input)
    expect(output).toEqual('.test {color: red;}')
  })

  it('converts numbers to pixels except for supported CSS attributes', () => {
    const input = {
      fontSize: 13,
      zIndex: 1,
      lineHeight: 1.5,
      order: 2,
      tabSize: 4,
      height: 500,
      margin: 30,
      columnCount: 3,
      width: 222,
    }
    const output = objectToCSS(root, input)
    expect(output).toEqual(
      '.test {font-size: 13px;z-index: 1;line-height: 1.5;order: 2;tab-size: 4;height: 500px;margin: 30px;column-count: 3;width: 222px;}'
    )
  })

  it('properly appends pseudo specified styles to the parent selector', () => {
    const input = {
      color: 'red',
      '&:hover': {
        color: 'blue',
      },
    }
    const output = objectToCSS(root, input)
    expect(output).toEqual('.test {color: red;}.test:hover {color: blue;}')
  })

  it('converts a deeply nested object to a CSS string', () => {
    const input = {
      color: 'rgb(0,100,0)',
      a: {
        fontSize: 12,
        '&:hover': {
          color: 'rgb(881,88,88)',
        },
        span: {
          color: 'rgb(100,0,0)',
          fontFamily: 'Arial',
          '@media screen and (min-width: 500px)': {
            color: 'rgb(0,0,100)',
          },
        },
      },
      '@media screen and (min-width: 960px)': {
        color: 'rgb(0,0,100)',
      },
      '@media screen and (min-width: 500px)': {
        color: 'rgb(100,0,0)',
      },
    }
    const output = objectToCSS(root, input)
    expect(output).toEqual(
      '.test {color: rgb(0,100,0);} @media screen and (min-width: 500px) { .test { color: rgb(100,0,0);}} @media screen and (min-width: 960px) { .test { color: rgb(0,0,100);}}.test a {font-size: 12px;}.test a:hover {color: rgb(881,88,88);}.test a span {color: rgb(100,0,0);font-family: Arial;} @media screen and (min-width: 500px) { .test a span { color: rgb(0,0,100);}}'
    )
  })

  it('converts a deeply nested object to a CSS string', () => {
    const input = {
      color: 'red',
      fontSize: 16,
      a: {
        color: 'green',
        '&:hover': {
          color: 'blue',
          '@media screen and (min-width: 768px)': { color: 'red' },
        },
        '@media screen and (min-width: 768px)': { color: 'blue' },
        svg: {
          fill: 'red',
          '@media screen and (min-width: 768px)': { fill: 'blue' },
          '@media screen and (min-width: 960px)': { fill: 'orange' },
          path: {
            stroke: 'white',
            '@media screen and (min-width: 768px)': { stroke: 'pink' },
          },
        },
      },
      span: {
        fontSize: 20,
      },
    }
    const output = objectToCSS(root, input)
    expect(output).toEqual(
      '.test {color: red;font-size: 16px;}.test a {color: green;} @media screen and (min-width: 768px) { .test a { color: blue;}}.test a:hover {color: blue;} @media screen and (min-width: 768px) { .test a:hover { color: red;}}.test a svg {fill: red;} @media screen and (min-width: 960px) { .test a svg { fill: orange;}} @media screen and (min-width: 768px) { .test a svg { fill: blue;}}.test a svg path {stroke: white;} @media screen and (min-width: 768px) { .test a svg path { stroke: pink;}}.test span {font-size: 20px;}'
    )
  })
})
