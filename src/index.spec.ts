import { curry } from './index.js'

describe('curry', () => {
  it('should return function result immediately', async () => {
    const fn = function (a: number, b: number, c: number) {
      return a + b + c
    }

    const result = curry(fn, [1, 2, 3])

    expect(result).toBe(6)
  })

  it('should return function result', async () => {
    const fn = function (a: number, b: number, c: number) {
      return a + b + c
    }
    const sut = curry(fn)
    const args = [1, 2, 3]

    // @ts-expect-error
    expect(sut(...args)).toBe(fn(...args))
  })

  it('should curry function until pass all arguments individually', async () => {
    const fn = function (a: number, b: number, c: number) {
      return a + b + c
    }
    const sut = curry(fn)

    //@ts-expect-error
    const result = sut(1)(5)(3)

    expect(result).toBe(9)
  })

  it('should curry function with chunked arguments', async () => {
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

  it('should not be affected by previous arguments', async () => {
    const fn = function (a: number, b: number, c: number) {
      return a + b + c
    }
    // @ts-expect-error
    const sum1 = curry(fn, [1])
    // @ts-expect-error
    const sum2 = sum1(1)

    // @ts-expect-error
    expect(sum1(1)(1)).toBe(3)
    // @ts-expect-error
    expect(sum2(4)).toBe(6)
  })

  it('should ignore extra arguments', async () => {
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
