import * as a from "./action-declares";
import { NoteState, NoteActionTypes } from "./types";

const initialState: NoteState = {
    allJournals: [],
    curJournal: {
        _id: '',
        title: '',
        titleIcon: '',
        bannerPic: '',
        createdTime: 0,
        createdUser: '',
        description: '',
        views: [],
        jourAttrs: [],
        notes: [],
    },
    curNote: {
        _id: '',
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
}

function noteReducer(
    state = initialState,
    action: NoteActionTypes
): NoteState  {
    switch (action.type) {
        case a.SET_ALL_JOURNALS:
            return {
                ...state,
                allJournals: action.payload
            }
        case a.SET_CUR_JOURNAL:
            console.log(action)
            return {
                ...state,
                curJournal: {
                    ...state.curJournal,
                    ...action.payload
                }
            }
        case a.SET_CUR_NOTE:
            return {
                ...state,
                curNote: action.payload
            }
        default:
            return state
    }
}

export default noteReducer