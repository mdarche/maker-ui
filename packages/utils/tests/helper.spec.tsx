/// <reference types="jest" />

import * as React from 'react'
import { render } from '@testing-library/react'
import {
  generateId,
  cn,
  mergeRefs,
  isObjectEmpty,
  cleanObject,
  formatNumber,
} from '../src'

describe('generateId', () => {
  test('returns a string of the correct length', () => {
    const length = 10
    const result = generateId(length)
    expect(result.length).toBe(length)
  })

  test('returns a string containing only alphanumeric characters', () => {
    const result = generateId(10)
    const regex = /^[a-zA-Z0-9]+$/
    expect(regex.test(result)).toBe(true)
  })

  test('returns a string with a letter as the first character', () => {
    const result = generateId(10)
    const firstChar = result.charAt(0)
    const regex = /^[a-zA-Z]+$/
    expect(regex.test(firstChar)).toBe(true)
  })

  it('should generate a lowercase id by default', () => {
    const id = generateId()
    expect(id).toMatch(/^[a-z][a-z0-9]{5}$/)
  })

  it('should generate an uppercase id when casing is "upper"', () => {
    const id = generateId(8, 'upper')
    expect(id).toMatch(/^[A-Z][A-Z0-9]{7}$/)
  })

  it('should generate a mixed case id when casing is "mixed"', () => {
    const id = generateId(10, 'mixed')
    expect(id).toMatch(/^[A-Za-z][A-Za-z0-9]{9}$/)
  })
})

describe('cn', () => {
  test('should return undefined for empty selectors', () => {
    expect(cn([])).toBeUndefined()
  })

  test('should join selectors with a space and remove duplicate spaces', () => {
    expect(cn(['my-class', 'your-class'])).toEqual('my-class your-class')
    expect(cn(['my-class', '', undefined, 'your-class'])).toEqual(
      'my-class your-class'
    )
  })

  it('should remove extra whitespace from inside selectors', () => {
    const result = cn(['bg-gray-100  border-#00ff00', 'text-center   '])
    expect(result).toEqual('bg-gray-100 border-#00ff00 text-center')
  })

  test('should trim leading/trailing spaces', () => {
    expect(cn(['  my-class  ', '  your-class   '])).toEqual(
      'my-class your-class'
    )
  })

  test('should return undefined if the resulting string is empty', () => {
    expect(cn(['', undefined])).toBeUndefined()
  })
})

describe('mergeRefs', () => {
  it('should merge multiple refs correctly', () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = React.createRef<HTMLDivElement>()
    const ref3 = React.createRef<HTMLDivElement>()

    const CombinedComponent = () => {
      const handleRef = mergeRefs([ref1, ref2, ref3])

      return <div ref={handleRef}>Test</div>
    }

    render(<CombinedComponent />)

    expect(ref1.current).toBeDefined()
    expect(ref2.current).toBeDefined()
    expect(ref3.current).toBeDefined()
  })

  it('should merge function refs correctly', () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = (value: HTMLDivElement | null) => {}

    const CombinedComponent = () => {
      const handleRef = mergeRefs([ref1, ref2])

      return <div ref={handleRef}>Test</div>
    }

    render(<CombinedComponent />)

    expect(ref1.current).toBeDefined()
  })
})

describe('isObjectEmpty', () => {
  it('should return true for an empty object', () => {
    const obj = {}
    expect(isObjectEmpty(obj)).toBe(true)
  })

  it('should return true for an object with null values', () => {
    const obj = {
      a: null,
      b: { c: null },
    }
    expect(isObjectEmpty(obj)).toBe(true)
  })

  it('should return true for an object with undefined values', () => {
    const obj = {
      a: undefined,
      b: { c: undefined },
    }
    expect(isObjectEmpty(obj)).toBe(true)
  })

  it('should return false for an object with non-empty values', () => {
    const obj = {
      a: 1,
      b: { c: 'hello' },
      d: [true],
      e: false,
    }
    expect(isObjectEmpty(obj)).toBe(false)
  })

  it('should return true for a deeply nested empty object', () => {
    const obj = {
      a: { b: { c: {} } },
    }
    expect(isObjectEmpty(obj, 10)).toBe(true)
  })

  it('should return false for a deeply nested non-empty object', () => {
    const obj = {
      a: { b: { c: { d: 1 } } },
    }
    expect(isObjectEmpty(obj, 10)).toBe(false)
  })

  it('should return true for an object with falsy values when checkFalsy is true', () => {
    const obj = {
      a: '',
      b: { c: 0 },
      d: false,
    }
    expect(isObjectEmpty(obj, 2, 0, true)).toBe(true)
  })

  it('should return false for an object with non-empty values when checkFalsy is true', () => {
    const obj = {
      a: 1,
      b: { c: 'hello' },
      d: [true],
    }
    expect(isObjectEmpty(obj, undefined, undefined, true)).toBe(false)
  })

  it('should return true for a deeply nested object with falsy values when checkFalsy is true', () => {
    const obj = {
      a: { b: { c: { d: '' } } },
    }
    expect(isObjectEmpty(obj, 10, 0, true)).toBe(true)
  })

  it('should return false for a deeply nested object with non-empty values when checkFalsy is true', () => {
    const obj = {
      a: { b: { c: { d: 1 } } },
    }
    expect(isObjectEmpty(obj, undefined, undefined, true)).toBe(false)
  })

  it('should limit recursion depth to maxDepth', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: {
                f: {},
              },
            },
          },
        },
      },
    }
    expect(isObjectEmpty(obj, 10)).toBe(true)
    expect(isObjectEmpty(obj, 3)).toBe(false)
  })
})

describe('cleanObject', () => {
  it('should remove undefined and null values', () => {
    const obj = {
      name: 'John Doe',
      age: undefined,
      gender: null,
      occupation: 'Developer',
    }

    const cleanedObj = cleanObject(obj)

    expect(cleanedObj).toEqual({
      name: 'John Doe',
      occupation: 'Developer',
    })
  })

  it('should not remove falsey values that are not undefined or null', () => {
    const obj = {
      a: 0,
      b: '',
      c: false,
      d: null,
      e: undefined,
    }

    const cleanedObj = cleanObject(obj)

    expect(cleanedObj).toEqual({
      a: 0,
      b: '',
      c: false,
    })
  })

  it('should return undefined if all values are undefined or null', () => {
    const obj = {
      a: undefined,
      b: null,
      c: undefined,
    }

    const cleanedObj = cleanObject(obj)

    expect(cleanedObj).toBeUndefined()
  })

  it('should return an empty object if input is an empty object', () => {
    const obj = {}

    const cleanedObj = cleanObject(obj)

    expect(cleanedObj).toEqual({})
  })
})

describe('formatNumber', () => {
  it('should return the same string if the value is a string', () => {
    const value = '12345'
    const template = 'Your number is %'

    const result = formatNumber(value, template)

    expect(result).toEqual('12345')
  })

  it('should replace the % in the template with the value if it is a number', () => {
    const value = 12345
    const template = 'Your number is %'

    const result = formatNumber(value, template)

    expect(result).toEqual('Your number is 12345')
  })

  it('should throw an error if the value is not a string or a number', () => {
    const value = true
    const template = 'Your number is %'

    expect(() => formatNumber(value as any, template)).toThrowError(
      new Error('Invalid type for value: boolean')
    )
  })
})
