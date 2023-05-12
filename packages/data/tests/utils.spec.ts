/// <reference types="jest" />
import { getNonEmptyKeys, formatNumber } from '../src/utils'

describe('getNonEmptyKeys', () => {
  it('returns keys of non-empty string, number, and boolean values', () => {
    const obj = {
      name: 'John Doe',
      age: 30,
      gender: '',
      hasPets: false,
    }

    const nonEmptyKeys = getNonEmptyKeys(obj)

    expect(nonEmptyKeys).toEqual(['name', 'age', 'hasPets'])
  })

  it('returns keys of non-empty array and object values', () => {
    const obj = {
      friends: ['Mike', 'Sara'],
      skills: [],
      profile: { occupation: 'Developer' },
      preferences: {},
    }

    const nonEmptyKeys = getNonEmptyKeys(obj)

    expect(nonEmptyKeys).toEqual(['friends', 'profile'])
  })

  it('returns an empty array if all values are empty', () => {
    const obj = {
      name: '',
      friends: [],
      profile: {},
    }

    const nonEmptyKeys = getNonEmptyKeys(obj)

    expect(nonEmptyKeys).toEqual([])
  })

  it('returns an empty array if input is an empty object', () => {
    const obj = {}

    const nonEmptyKeys = getNonEmptyKeys(obj)

    expect(nonEmptyKeys).toEqual([])
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
