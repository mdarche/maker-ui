import { responsive, formatCSS } from '../src/css'

const breakpoints = ['500px', '800px', '1000px']
const colors = ['red', 'blue', 'green']

describe('Responsive array parser', () => {
  test('supports ResponsiveScale values', () => {
    const styles = responsive(
      {
        fontSize: 12,
        color: colors,
      },
      breakpoints
    )
    expect(styles).toEqual({
      fontSize: 12,
      color: 'red',
      '@media screen and (min-width: 500px)': {
        color: 'blue',
      },
      '@media screen and (min-width: 800px)': {
        color: 'green',
      },
    })
  })

  test('merges media queries to support multiple ResponsiveScale style rules', () => {
    const styles = responsive(
      {
        color: colors,
        background: colors,
      },
      breakpoints
    )

    expect(styles).toEqual({
      color: 'red',
      background: 'red',
      '@media screen and (min-width: 500px)': {
        color: 'blue',
        background: 'blue',
      },
      '@media screen and (min-width: 800px)': {
        color: 'green',
        background: 'green',
      },
    })
  })
})

describe('CSS object parser', () => {
  test('recursively formats responsive nested styles', () => {
    const styles = formatCSS(
      {
        color: 'red',
        '.my-class': {
          fontSize: 34,
          h2: {
            color: colors,
          },
        },
      },
      breakpoints
    )(null)

    expect(styles).toEqual({
      color: 'red',
      '.my-class': {
        fontSize: 34,
        h2: {
          color: 'red',
          '@media screen and (min-width: 500px)': {
            color: 'blue',
          },
          '@media screen and (min-width: 800px)': {
            color: 'green',
          },
        },
      },
    })
  })

  test('supports emotion ThemeProvider breakpoints', () => {
    const styles = formatCSS({ color: colors })({
      breakpoints: ['300px', '80vw'],
    })
    expect(styles).toEqual({
      color: 'red',
      '@media screen and (min-width: 300px)': {
        color: 'blue',
      },
      '@media screen and (min-width: 80vw)': {
        color: 'green',
      },
    })
  })

  test('uses default breakpoints as fallback', () => {
    const styles = formatCSS({ color: colors })(null)
    expect(styles).toEqual({
      color: 'red',
      '@media screen and (min-width: 768px)': {
        color: 'blue',
      },
      '@media screen and (min-width: 960px)': {
        color: 'green',
      },
    })
  })
})
