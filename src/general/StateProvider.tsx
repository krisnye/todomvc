import { createContext, useContext, useEffect, useState } from "react";
import { Reducers, ReducersWithoutState, Selector } from "./Types";
import { Store } from "./Store";
import { createUpdateFunctionsFromReducers } from "./Functions";

export type StateContextValue<S, R> = {
    store: Store<S>;
    actions: ReducersWithoutState<R>;
};

export function createStateContext<S, R extends Reducers<S>>() {
    return createContext<StateContextValue<S, R>>(
        {} as unknown as StateContextValue<S, R>
    );
}

export type Middleware<R> = (reducers: R) => R;

type Props<S, R extends Reducers<S>> = {
    children?: React.ReactNode;
    store: Store<S>;
    reducers: R;
    context: React.Context<StateContextValue<S, R>>;
    middleware?: Middleware<R>[];
};
export function StateProvider<S, R extends Reducers<S>>(props: Props<S, R>) {
    const { store } = props;
    let { reducers } = props;
    for (let middeware of props.middleware ?? []) {
        reducers = middeware(reducers);
    }
    const actions = createUpdateFunctionsFromReducers(store, reducers);
    const value = {
        store,
        actions,
    };
    return (
        <props.context.Provider value={value}>
            {props.children}
        </props.context.Provider>
    );
}

function identity<IN>(input: IN): IN {
    return input;
}

function dataEquals(a: unknown, b: unknown) {
    return a === b || JSON.stringify(a) === JSON.stringify(b);
}

export function useContextState<S, R extends Reducers<S>, OUT>(
    context: React.Context<StateContextValue<S, R>>,
    selector: Selector<S, OUT> = identity as Selector<S, OUT>
): [OUT, StateContextValue<S, R>["actions"]] {
    const stateContext = useContext(context);
    const [state, setState] = useState<OUT>(selector(stateContext.store.value));
    useEffect(() => {
        return stateContext.store.observe((newValue) => {
            const newState = selector(newValue);
            if (!dataEquals(state, newState)) {
                setState(newState);
            }
        });
    });
    return [state, stateContext.actions];
}
