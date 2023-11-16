import { AppState } from "../state/AppState";
import { AppStateReducers } from "../state/AppStateReducers";
import {
    createStateContext,
    useContextState,
} from "../../general/StateProvider";
import { StateWithUndoRedo } from "../../general/UndoRedo";
import { Selector } from "../../general/Types";

export const AppStateContext = createStateContext<
    StateWithUndoRedo<AppState>,
    typeof AppStateReducers
>();

export function useAppState<OUT>(
    selector: Selector<StateWithUndoRedo<AppState>, OUT>
) {
    return useContextState(AppStateContext, selector);
}
