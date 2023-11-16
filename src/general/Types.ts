export type Reducer<S = unknown, P = any> = (state: S, options: P) => S;

export type Reducers<S> = Record<string, Reducer<S>>;

export type ReducerWithoutState<R> = R extends (
    state: infer T,
    options: infer P
) => unknown
    ? (options: P) => T
    : never;

export type ReducersWithoutState<R> = {
    [K in keyof R]: ReducerWithoutState<R[K]>;
};

export type Selector<IN, OUT> = (input: IN) => OUT;
