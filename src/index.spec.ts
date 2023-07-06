import { curry } from './index.js'

const sum3 = function (a: number, b: number, c: number) {
  return a + b + c
}

describe('curry', () => {
  it('should return function result immediately', () => {
    const result = curry(sum3, [1, 2, 3])

    expect(result).toBe(6)
  })

  it('should return function result', () => {
    const sut = curry(sum3)
    const args = [1, 2, 3] as const

    expect(sut(...args)).toBe(sum3(...args))
  })

  it('should curry function until pass all arguments individually', () => {
    const sut = curry(sum3)

    //@ts-expect-error
    const result = sut(1)(5)(3)

    expect(result).toBe(9)
  })

  it('should curry function with chunked arguments', () => {
    const fn = function (a: number, b: number, c: number, d: number) {
      return a + b + c + d
    }
    const sut = curry(fn)

    // @ts-expect-error
    const result = sut(5, 2)(3, 1)
    // @ts-expect-error
    const result2 = sut(5)(2, 3, 1)

    expect(result).toBe(11)
    expect(result2).toBe(11)
  })

  it('should not be affected by previous arguments', () => {
    // @ts-expect-error
    const sum1 = curry(sum3, [1])
    // @ts-expect-error
    const sum2 = sum1(1)

    // @ts-expect-error
    expect(sum1(1)(1)).toBe(3)
    // @ts-expect-error
    expect(sum2(4)).toBe(6)
  })

  it('should ignore extra arguments', () => {
    var reportArgs = curry(function (a, b) {
      return [].slice.call(arguments)
    })

    //@ts-expect-error
    const result = reportArgs('a', 'b', 'c', 'd', 'e')

    expect(result).toStrictEqual(['a', 'b'])
  })

  it('should allow none arg curried function', function () {
    const fn = function () {}

    const result = curry(fn)

    expect(result).toBeUndefined()
  })
})
