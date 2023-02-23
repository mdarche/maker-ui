/// <reference types="jest" />

import * as React from 'react'
import { render } from '@testing-library/react'
import { generateId, cn, mergeRefs } from '../src'

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
