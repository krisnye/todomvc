# React Context based state

## Usage

    npm install
    npm run dev

## Goals

-   [x] Observability - centralized.
    -   See App.tsx#logging
-   [x] Testability.
    -   See specific/state/Todo/TodoReducers.ts
    -   All reducers are pure functions, easily testable.
-   [x] Maintainability - must be composable.
    -   See specific/state/AppStateReducers.ts
-   [x] Easy state rollbacks for client undo/redo features
    -   Search for `addUndoRedoReducers`
    -   Undo/Redo easily and cleanly added to any existing model.
-   [x] Scalability. O(1) performance on a single row edit.
    -   See the console which will display state changes and all react element render calls.
    -   When changing a single row, only a single row of UI is re-rendered.
-   [x] Performance - Model should be able to update at 60fps. If not then we always end up hacking something in to work around the limitation.
    -   Click and drag tasks around to test realtime update speed.
    -   Disable logging in main.tsx and comment out console.log in TodoRow.tsx to avoid performance interference

## Notes

general folder contains non-application specific code to support state
specific folder contains application specific code
