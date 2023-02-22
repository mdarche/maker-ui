import { generateId } from '../src'

describe('generateId', () => {
  it('should return a string of specified length', () => {
    const length = 10
    const result = generateId(length)
    expect(result.length).toBe(length)
  })

  it('should return a string consisting of letters and numbers when type is "mixed"', () => {
    const result = generateId(10, 'mixed')
    expect(result).toMatch(/^[a-z0-9]+$/)
  })

  it('should return a string consisting of letters only when type is "letters"', () => {
    const result = generateId(10, 'letters')
    expect(result).toMatch(/^[a-z]+$/)
  })

  it('should return a string consisting of numbers only when type is "numbers"', () => {
    const result = generateId(10, 'numbers')
    expect(result).toMatch(/^[0-9]+$/)
  })

  it('should always return a string that starts with a letter when type is not "numbers"', () => {
    const result = generateId(10, 'mixed')
    expect(result.charAt(0)).toMatch(/[a-z]/)
  })
})
