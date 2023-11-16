import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { AppStateContext } from "./specific/hooks/useAppState.tsx";
import { AppStateReducers } from "./specific/state/AppStateReducers.ts";
import { captureCalls } from "./general/Functions.ts";
import { StateProvider } from "./general/StateProvider.tsx";
import { defaultAppState } from "./specific/state/AppState.ts";
import { createStore } from "./general/Store.ts";
import { defaultStateWithUndoRedo } from "./general/UndoRedo.ts";

function logging(actions: typeof AppStateReducers) {
    return captureCalls(actions, ({ name, args: [state, options], result }) => {
        console.log(`${name}(${JSON.stringify(options)})`, {
            input: state,
            output: result,
        });
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StateProvider
        context={AppStateContext}
        reducers={AppStateReducers}
        store={createStore(defaultStateWithUndoRedo(defaultAppState))}
        middleware={[logging]}
    >
        <App />
    </StateProvider>
);
