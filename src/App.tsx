import { useRef } from "react";
import "./App.css";
import { AppStateContext, useAppState } from "./specific/hooks/useAppState";
import { TodoList } from "./specific/components/TodoList";
import { UndoRedoButtons } from "./general/UndoRedoButtons";
import { TodoCount } from "./specific/components/TodoCount";

export function App() {
    const [_state, actions] = useAppState((_state) => null);
    const nameRef = useRef<HTMLInputElement>(null);

    console.log(`<App>`);

    return (
        <>
            <h1>React Context Todo MVC</h1>
            <div>
                <div>
                    <UndoRedoButtons context={AppStateContext} />
                    <button
                        onClick={() => {
                            actions.reset({ source: "clearButton" });
                        }}
                    >
                        Clear All
                    </button>
                    <TodoCount />
                </div>
                <input
                    ref={nameRef}
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            actions.createTodo({
                                name: e.currentTarget.value.trim(),
                                source: "inputEnter",
                            });
                            e.currentTarget.select();
                        }
                    }}
                ></input>
                <button
                    onClick={() => {
                        const name = nameRef.current!.value;
                        actions.createTodo({ name, source: "createButton" });
                    }}
                >
                    Create
                </button>
            </div>
            <TodoList />
        </>
    );
}

export default App;
