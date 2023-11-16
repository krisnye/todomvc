import { memo } from "react";
import { StateWithUndoRedo } from "../../general/UndoRedo";
import { useAppState } from "../hooks/useAppState";
import { AppState } from "../state/AppState";

function todoCounts(state: StateWithUndoRedo<AppState>) {
    return {
        completed: Object.values(state.value.todos).filter(
            (todo) => todo.complete === 100
        ).length,
        total: Object.keys(state.value.todos).length,
    };
}

export const TodoCount = memo(function TodoCount() {
    const [state, _actions] = useAppState(todoCounts);
    console.log(`<TodoCount />`);
    return (
        <span>
            {state.completed} / {state.total} Tasks
        </span>
    );
});
