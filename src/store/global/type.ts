import {JournalObject} from "@/types/journal";

export interface GlobalState {
    title: string
    loggedIn: boolean
    token: string
    user: string
    journals: Array<JournalObject>
}
