type Slice<
  T extends unknown[],
  K extends number,
  C extends number[] = []
> = C['length'] extends K
  ? T
  : T extends [unknown, ...infer R]
  ? Slice<R, K, [...C, C['length']]>
  : never

type Reverse<T extends any[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : T

type VaryParams<T extends unknown[]> = T['length'] extends 1 | 0
  ? T
  : T | VaryParams<Reverse<Slice<Reverse<T>, 1>>>

type Callback<TParams extends unknown[], TResult> = (
  ...args: TParams
) => TResult

export type Curry<
  CParams extends unknown[],
  CResult,
  TParams extends unknown[] = VaryParams<CParams>,
  K = TParams
> = TParams['length'] extends CParams['length']
  ? CResult extends void
    ? undefined
    : CResult
  : K extends TParams
  ? Callback<
      K,
      Curry<
        Slice<CParams, K['length']>,
        CResult,
        VaryParams<Slice<CParams, K['length']>>
      >
    >
  : never

export function curry<CParams extends unknown[], CResult>(
  fn: Callback<CParams, CResult>,
  args: CParams = [] as unknown as CParams
): Curry<CParams, CResult> {
  if (args.length >= fn.length) {
    return fn(...(args.slice(0, fn.length) as CParams)) as Curry<
      CParams,
      CResult
    >
  }
  return ((..._args: CParams) => {
    return curry(fn, args.concat(_args) as CParams)
  }) as Curry<CParams, CResult>
}
