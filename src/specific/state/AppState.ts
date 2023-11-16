import type { Todo } from "./Todo/Todo";

export interface AppState {
    todos: { [id: string]: Todo };
}

export const defaultAppState = { todos: {} };
