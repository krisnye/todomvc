import type { AppState } from "../AppState";
import { patchProperty } from "../../../general/Functions";
import { Reducer } from "../../../general/Types";
import { NotUndoable } from "../../../general/UndoRedo";

function getNextId(state: AppState) {
    for (let i = 0; true; i++) {
        if (state.todos[i] === undefined) {
            return i.toString();
        }
    }
}

export const TodoReducers = {
    createTodo(
        state: AppState,
        options: { name: string; source: "inputEnter" | "createButton" }
    ) {
        const id = getNextId(state);
        let { name } = options;
        name = name.trim();
        if (name.length === 0) {
            name = `New Task ${id}`;
        }
        return patchProperty(state, "todos", {
            [id]: { name, complete: 0 },
        });
    },
    deleteTodo(
        state: AppState,
        options: { id: string; source: "deleteButton" }
    ) {
        const { id } = options;
        return patchProperty(state, "todos", {
            [id]: undefined,
        });
    },
    setTodoName(state: AppState, options: { id: string; name: string }) {
        const { id, name } = options;
        return patchProperty(
            state,
            "todos",
            patchProperty(state.todos, id, { name })
        );
    },
    setTodoComplete(
        state: AppState,
        options: { id: string; complete: number }
    ) {
        const { id, complete } = options;
        return patchProperty(
            state,
            "todos",
            patchProperty(state.todos, id, { complete })
        );
    },
    dragStart(state: AppState, options: { id: string } & NotUndoable) {
        const { id } = options;
        return patchProperty(
            state,
            "todos",
            patchProperty(state.todos, id, { drag: { x: 0, y: 0 } })
        );
    },
    dragMove(
        state: AppState,
        options: { id: string; x: number; y: number } & NotUndoable
    ) {
        const { id, x, y } = options;
        return patchProperty(
            state,
            "todos",
            patchProperty(state.todos, id, { drag: { x, y } })
        );
    },
    dragEnd(state: AppState, options: { id: string } & NotUndoable) {
        const { id } = options;
        return patchProperty(
            state,
            "todos",
            patchProperty(state.todos, id, { drag: undefined })
        );
    },
} as const satisfies Record<string, Reducer<AppState>>;
