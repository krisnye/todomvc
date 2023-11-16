import { Store } from "./Store";
import { Reducers, ReducersWithoutState } from "./Types";

function deleteUndefineds<V extends object>(value: V) {
    for (let name in value) {
        if (value[name] === undefined) {
            delete value[name];
        }
    }
    return value;
}

export function patchProperty<T, K extends keyof T>(
    state: T,
    property: K,
    value: Partial<T[K]>
) {
    return {
        ...state,
        [property]: deleteUndefineds({
            ...state[property],
            ...value,
        }),
    };
}

export function mapObjectValues<IN extends object, OUT = IN>(
    value: IN,
    map: (value: any, name: string) => unknown
): OUT {
    return Object.fromEntries(
        Object.entries(value).map(([name, reducer]) => [
            name,
            map(reducer, name),
        ])
    ) as OUT;
}

export function createUpdateFunctionsFromReducers<T, R extends Reducers<T>>(
    store: Store<T>,
    reducers: R
): ReducersWithoutState<R> {
    return mapObjectValues<R, ReducersWithoutState<R>>(
        reducers,
        (reducer) => (options: unknown) => {
            store.update(reducer(store.value, options));
        }
    );
}

export function captureCalls<S, R extends object>(
    functions: R,
    callback: (call: FunctionLogs<S, R>) => void
): R {
    return mapObjectValues(functions, (func, name) => (...args: unknown[]) => {
        const result = func(...args);
        callback({ name, args, result } as FunctionLogs<S, R>);
        return result;
    });
}
type FunctionLogs<S, F extends object> = {
    [N in keyof F]: { name: N; args: MaybeParameters<F[N]>; result: S };
}[keyof F];

type MaybeParameters<F> = F extends (...args: infer P) => unknown ? P : never;
