import * as ACT from "./actions";
import { NoteState } from "@/types/states";

const initNoteState: NoteState = {
    noteChanged: false,
    note: {
        _id: '',
        _rev: '',
        journalId: '',
        title: '',
        titleIcon: '',
        bannerImg: '',
        createdTime: 0,
        createdUser: '',
        modifiedTime: 0,
        modifiedUser: '',
        content: [],
        attributes: [],
    },
    content: {
        _id: '',
        _rev: '',
        content: [],
    },
    journalAttrs: [],

    journal: {
        _id: '',
        _rev: '',
        title: '',
        titleIcon: '',
        bannerPic: '',
        createdTime: 0,
        createdUser: '',
        description: '',
        attrs: [],
        views: [],
    },
}

function noteReducer(
    state = initNoteState,
    action: ACT.NoteActionTypes
): NoteState  {
    switch (action.type) {
        case ACT.SET_NOTE_ALL:
            return { ...state, ...action.payload }
        case ACT.SET_NOTE_INFO:
            return {
                ...state,
                noteChanged: true,
                note: {
                    ...state.note,
                    ...action.payload,
                }
            }
        case ACT.SET_NOTE_CONTENT:
            return { ...state, content: action.payload }
        default:
            return state
    }
}

export default noteReducer