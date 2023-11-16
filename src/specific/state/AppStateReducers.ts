import { AppState } from "./AppState";
import { Reducer } from "../../general/Types";
import { TodoReducers } from "./Todo/TodoReducers";
import { addUndoRedoReducers } from "../../general/UndoRedo";

const BasicAppStateReducers = {
    reset(state: AppState, _options: { source: "clearButton" }) {
        return { ...state, todos: {} };
    },
    ...TodoReducers,
} as const satisfies Record<string, Reducer<AppState>>;

export const AppStateReducers = addUndoRedoReducers<
    AppState,
    typeof BasicAppStateReducers
>(BasicAppStateReducers);
