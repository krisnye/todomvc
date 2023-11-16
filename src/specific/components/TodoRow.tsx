import { memo } from "react";
import { useAppState } from "../hooks/useAppState";

export const TodoRow = memo(function TodoRow(props: { id: string }) {
    const { id } = props;
    const [todo, actions] = useAppState((state) => state.value.todos[id]);
    console.log(`<TodoRow ${id} />`);

    return (
        <div
            style={{
                display: "inline-block",
                position: "relative",
                left: todo.drag?.x,
                top: todo.drag?.y,
                zIndex: todo.drag ? 1 : undefined,
                background: "white",
                boxShadow: todo.drag
                    ? "5px 3px 10px rgba(0,0,0,0.5)"
                    : undefined,
                transition: "box-shadow 0.2s ease-out",
                userSelect: "none",
            }}
        >
            <input
                type="checkbox"
                checked={todo.complete === 100}
                onChange={() => {
                    actions.setTodoComplete({
                        id,
                        complete: todo.complete ? 0 : 100,
                    });
                }}
            ></input>
            <span
                onPointerDown={(e) => {
                    (e.target as HTMLElement).setPointerCapture(e.pointerId);
                    actions.dragStart({ id, undoable: false });
                }}
                onPointerMove={(e) => {
                    if (todo.drag) {
                        //  86 microseconds on 2017 2.9 GHz Quad-Core Intel Core i7
                        actions.dragMove({
                            undoable: false,
                            id,
                            x: todo.drag.x + e.movementX,
                            y: todo.drag.y + e.movementY,
                        });
                    }
                }}
                onPointerUp={(e) => {
                    if (todo.drag) {
                        (e.target as HTMLElement).releasePointerCapture(
                            e.pointerId
                        );
                        actions.dragEnd({
                            undoable: false,
                            id,
                        });
                    }
                }}
            >
                {todo.name} : {todo.complete}%
            </span>
            <button
                title="Delete"
                onClick={() => {
                    actions.deleteTodo({ id, source: "deleteButton" });
                }}
            >
                X
            </button>
        </div>
    );
});
