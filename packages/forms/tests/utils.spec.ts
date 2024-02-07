/// <reference types="jest" />
import { isEmpty, deepSearch } from '../src/helpers'

/**
 * isEmpty
 */
describe('isEmpty', () => {
  it('returns true for an empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('returns true for an object with all values set to undefined', () => {
    expect(isEmpty({ a: undefined, b: undefined, c: undefined })).toBe(true)
  })

  it('returns true for an object with all values set to null', () => {
    expect(isEmpty({ a: null, b: null, c: null })).toBe(true)
  })

  it('returns false for an object with some values set', () => {
    expect(isEmpty({ a: 1, b: undefined, c: null })).toBe(false)
  })

  it('returns false for an object with some falsy values set', () => {
    expect(isEmpty({ a: '', b: 0, c: null })).toBe(false)
  })
})

/**
 * deepSearch
 */
describe('deepSearch', () => {
  const collection = [
    {
      name: 'Alice',
      age: 30,
      nested: [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
      ],
    },
    { name: 'Bob', age: 40 },
    {
      name: 'Charlie',
      age: 50,
      nested: [
        { id: 3, value: 'baz' },
        { id: 4, value: 'qux' },
      ],
    },
  ]

  it('should find objects with matching key-value pair', () => {
    expect(deepSearch(collection, 'name', 'Bob')).toEqual({
      name: 'Bob',
      age: 40,
    })
  })

  it('should find objects with matching nested key-value pair', () => {
    //@ts-ignore
    expect(deepSearch(collection, 'id', 3)).toEqual({
      id: 3,
      value: 'baz',
    })
  })

  it('should return undefined if key-value pair not found', () => {
    expect(deepSearch(collection, 'name', 'Dave')).toBeUndefined()
  })
})
