import {JournalAttribute, JournalObject, JournalView} from "@/types/journal";
import {NoteContent, NoteObject} from "@/types/note";
import {RequestStatus} from "@/types/request";
import PouchDB from "pouchdb-browser";

export interface NoteState {
    noteChanged: boolean
    note: NoteObject
    content: NoteContent
    journalAttrs: Array<JournalAttribute>
    journal: JournalObject
}

export interface JournalState {
    journalChanged: boolean
    journal: JournalObject
    attrs: Array<JournalAttribute>
    views: Array<JournalView>
    notes: Array<NoteObject>
}

interface WorkSpace {
    database: string
    name: string
    user: string
}

export interface UserInfo {
    username: string
    email: string
    avatar: string
    workspaces: Array<WorkSpace>
}

export interface RemoteDBInfo {
    name: string
    user: string
    password: string
    database: string
}
export interface GlobalState {
    title: string
    globalLoading: boolean
    loginStatus: RequestStatus
    signUpStatus: RequestStatus
    token: string
    userInfo: UserInfo | null
    journals: Array<JournalObject>
    dbSyncStatus: string
    browserDBConn: PouchDB.Database | null
    remoteDBInfo: RemoteDBInfo | null
}
