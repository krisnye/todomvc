import { mapObjectValues } from "./Functions";
import { Reducers } from "./Types";

export interface StateWithUndoRedo<S> {
    value: S;
    undo: S[];
    redo: S[];
}

export type Undoable = { undoable: boolean };
export type NotUndoable = { undoable: false };
function isUndoable(options: unknown) {
    const maybeUndoable = options as Partial<Undoable>;
    return maybeUndoable.undoable !== false;
}

/**
 * Maps store reducers to apply to an undo/redo store and also adds undo/redo reducers.
 */
export function addUndoRedoReducers<S, R extends Reducers<S>>(
    reducers: R
): ReducersWithUndoRedo<S, R> {
    const mappedValues = mapObjectValues(reducers, (reducer) => {
        return (state: StateWithUndoRedo<S>, options: unknown) => {
            const oldValue = state.value;
            const newValue = reducer(oldValue, options);
            if (newValue === oldValue) {
                return state; // no-op
            }
            if (isUndoable(options)) {
                return {
                    ...state,
                    value: newValue,
                    undo: [...state.undo, oldValue],
                    redo: [],
                };
            } else {
                return {
                    ...state,
                    value: newValue,
                };
            }
        };
    });
    return {
        ...UndoRedoReducers,
        ...mappedValues,
    } as ReducersWithUndoRedo<S, R>;
}

export type ReducersWithUndoRedo<
    S,
    R extends Reducers<S>
> = typeof UndoRedoReducers & {
    [N in keyof R]: R[N] extends (s: S, options: infer T) => S
        ? (state: StateWithUndoRedo<S>, options: T) => StateWithUndoRedo<S>
        : never;
};

const UndoRedoReducers = {
    undo<S>(state: StateWithUndoRedo<S>, _options: {}) {
        if (!state.undo.length) {
            return state;
        }
        return {
            ...state,
            value: state.undo[state.undo.length - 1],
            undo: state.undo.slice(0, -1),
            redo: [...state.redo, state.value],
        };
    },
    redo<S>(state: StateWithUndoRedo<S>, _options: {}) {
        if (!state.redo.length) {
            return state;
        }
        return {
            ...state,
            value: state.redo[state.redo.length - 1],
            undo: [...state.undo, state.value],
            redo: state.redo.slice(0, -1),
        };
    },
};

export function defaultStateWithUndoRedo<S>(value: S): StateWithUndoRedo<S> {
    return { value, undo: [], redo: [] };
}
