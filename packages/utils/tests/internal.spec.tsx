/// <reference types="jest" />

import { formatNumber } from '../src'
import {
  StyleConfig,
  camelToKebab,
  getCssVariables,
  mapStyles,
} from '../src/internal'

describe('camelToKebab', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(camelToKebab('camelCase')).toBe('camel-case')
    expect(camelToKebab('someRandomFunctionName')).toBe(
      'some-random-function-name'
    )
    expect(camelToKebab('alreadyKebab')).toBe('already-kebab')
  })

  it('should handle single word strings', () => {
    expect(camelToKebab('word')).toBe('word')
  })

  it('should return an empty string if given an empty string', () => {
    expect(camelToKebab('')).toBe('')
  })

  it('should handle camelCase strings with numbers', () => {
    expect(camelToKebab('camelCase1Word')).toBe('camel-case1-word')
  })
})

describe('mapStyles', () => {
  it('should return an empty object if sectionStyles is undefined', () => {
    const result = mapStyles(undefined, 'prefix')
    expect(result).toEqual({})
  })

  it('should correctly prefix and format style keys', () => {
    const styles = {
      color: 'red',
      backgroundColor: 'blue',
    }
    const expected = {
      '--prefix-color': 'red',
      '--prefix-background-color': 'blue',
    }
    const result = mapStyles(styles, 'prefix')
    expect(result).toEqual(expected)
  })

  it('should format values if key is included in formatProps', () => {
    const styles = {
      padding: '10',
      fontSize: '12',
    }
    const expected = {
      '--prefix-padding': formatNumber('10'),
      '--prefix-font-size': formatNumber('12'),
    }
    const result = mapStyles(styles, 'prefix', ['padding', 'fontSize'])
    expect(result).toEqual(expected)
  })

  it('should not format values if key is not included in formatProps', () => {
    const styles = {
      color: 'red',
      fontSize: '12',
    }
    const expected = {
      '--prefix-color': 'red',
      '--prefix-font-size': '12',
    }
    const result = mapStyles(styles, 'prefix', ['padding'])
    expect(result).toEqual(expected)
  })
})

describe('getCssVariables', () => {
  const testConfig: Record<string, StyleConfig> = {
    sectionA: {
      prefix: 'prefix-a',
      properties: ['color', 'size'],
    },
    sectionB: {
      prefix: 'prefix-b',
      properties: ['width', 'height'],
    },
  }

  it('should generate correct CSS variables based on the config', () => {
    const styles = {
      sectionA: {
        color: 'red',
        size: '10',
      },
      sectionB: {
        width: '100px',
        height: '50px',
      },
    }
    const expected = {
      '--prefix-a-color': 'red',
      '--prefix-a-size': '10',
      '--prefix-b-width': '100px',
      '--prefix-b-height': '50px',
    }
    const result = getCssVariables(styles, testConfig)
    expect(result).toEqual(expected)
  })

  it('should format values if key is included in formatProps of mapStyles', () => {
    const styles = {
      sectionA: {
        color: 'red',
        size: '10',
      },
      sectionB: {
        width: '100',
        height: '50',
      },
    }
    const expected = {
      '--prefix-a-color': 'red',
      '--prefix-a-size': formatNumber('10'),
      '--prefix-b-width': formatNumber('100'),
      '--prefix-b-height': formatNumber('50'),
    }
    const result = getCssVariables(styles, testConfig)
    expect(result).toEqual(expected)
  })

  it('should handle missing or undefined sections gracefully', () => {
    const styles = {
      sectionA: {
        color: 'red',
      },
    }
    const expected = {
      '--prefix-a-color': 'red',
    }
    const result = getCssVariables(styles, testConfig)
    expect(result).toEqual(expected)
  })

  it('should clean out any null or undefined values', () => {
    const styles = {
      sectionA: {
        color: null,
        size: undefined,
      },
    }
    const result = getCssVariables(styles, testConfig)
    expect(result).toEqual(undefined)
  })
})
