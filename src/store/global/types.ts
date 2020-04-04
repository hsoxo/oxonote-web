export const SET_TITLE = 'SET_TITLE'

export interface GlobalState {
    title: string
    loggedIn: boolean
    token: string
    user: string
}

interface SetTitleAction {
    type: typeof SET_TITLE
    title: string
}

export type GlobalActionTypes = SetTitleAction