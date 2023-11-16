import { Context, memo } from "react";
import { StateWithUndoRedo } from "../general/UndoRedo";
import { StateContextValue, useContextState } from "./StateProvider";
import { Reducers } from "./Types";

type Props<S extends StateWithUndoRedo<unknown>, R extends Reducers<S>> = {
    context: Context<StateContextValue<S, R>>;
};
function UndoRedoButtonsInternal<
    S extends StateWithUndoRedo<unknown>,
    R extends Reducers<S>
>(props: Props<S, R>) {
    const [state, actions] = useContextState(
        props.context,
        ({ undo, redo }) => ({ undo, redo })
    );

    console.log(`<UndoRedoButons />`);

    return (
        <>
            <button
                disabled={state.undo.length === 0}
                onClick={() => {
                    actions.undo({});
                }}
            >
                Undo {state.undo.length}
            </button>
            <button
                disabled={state.redo.length === 0}
                onClick={() => {
                    actions.redo({});
                }}
            >
                Redo {state.redo.length}
            </button>
        </>
    );
}

export const UndoRedoButtons = memo(
    UndoRedoButtonsInternal
) as typeof UndoRedoButtonsInternal;
