/// <reference types="jest" />
import { isEmpty, deepSearch, findAllValuesByKey } from '../src/helpers'

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

/**
 * findAllValuesByKey
 */
describe('findAllValuesByKey', () => {
  it('returns an empty array when the object is empty', () => {
    expect(findAllValuesByKey({}, 'foo')).toEqual([])
  })

  it('returns an empty array when the target key is not found', () => {
    expect(findAllValuesByKey({ a: 1, b: { c: 2 } }, 'foo')).toEqual([])
  })

  it('returns an array of values corresponding to the target key', () => {
    expect(
      findAllValuesByKey({ a: 1, b: { c: 2, d: { e: 3 } }, f: { g: 4 } }, 'c')
    ).toEqual([2])
  })

  it('returns an array of values corresponding to the target key when there are multiple matches', () => {
    expect(
      findAllValuesByKey({ a: 1, b: { c: 2, d: { c: 3 } }, e: { c: 4 } }, 'c')
    ).toEqual([2, 3, 4])
  })

  it('returns an array of values corresponding to the target key when nested arrays are present', () => {
    expect(findAllValuesByKey({ a: 1, b: [{ c: 2 }, { c: 3 }] }, 'c')).toEqual([
      2, 3,
    ])
  })

  it('returns an array of values corresponding to the target key when nested objects with null values are present', () => {
    expect(findAllValuesByKey({ a: { b: { c: null } }, d: null }, 'c')).toEqual(
      [null]
    )
  })
  it('returns an empty array if object is empty', () => {
    expect(findAllValuesByKey({}, 'key')).toEqual([])
  })

  it('should return an empty array if key is not found', () => {
    const obj = {
      a: 'key1',
      b: { c: 'key2', d: 'key3' },
      e: [{ f: 'key4' }, { g: 'key1' }],
      h: null,
      i: undefined,
    }
    expect(findAllValuesByKey(obj, 'key5')).toEqual([])
  })
})
