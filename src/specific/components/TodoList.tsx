import { memo } from "react";
import { StateWithUndoRedo } from "../../general/UndoRedo";
import { useAppState } from "../hooks/useAppState";
import { AppState } from "../state/AppState";
import { TodoRow } from "./TodoRow";

function keysSlice(state: StateWithUndoRedo<AppState>) {
    return {
        todos: Object.keys(state.value.todos),
    };
}

export const TodoList = memo(function TodoList() {
    const [state, _actions] = useAppState(keysSlice);
    console.log(`<TodoList ${state.todos.join(",")} />`);
    return (
        <div>
            {state.todos.map((id) => (
                <TodoRow key={id} id={id} />
            ))}
        </div>
    );
});
