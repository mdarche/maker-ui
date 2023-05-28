/// <reference types="jest" />
import { getNonEmptyKeys } from '../src/utils'

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
