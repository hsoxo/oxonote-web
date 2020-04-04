import {
    GlobalState,
    SET_TITLE,
    GlobalActionTypes
} from "./types";

const initialState: GlobalState = {
    title: 'Welcome to OxO Notes',
    loggedIn: true,
    token: '',
    user: 'hs'
}

export function globalReducer(
    state = initialState,
    action: GlobalActionTypes
): GlobalState  {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.title || 'Welcome to OxO Notes',
            }
        default:
            return state
    }
}
