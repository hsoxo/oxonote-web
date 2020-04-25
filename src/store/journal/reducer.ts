import * as ACT from './actions'
import { JournalState } from '@/types/states'

const initJournalState: JournalState = {
  journalChanged: false,
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
  attrs: [],
  views: [],
  notes: []
}

function journalReducer(
  state = initJournalState,
  action: ACT.JournalActions
): JournalState {
  switch (action.type) {
    case ACT.SET_JOURNAL_ALL:
      return { ...state, ...action.payload }
    case ACT.SET_JOURNAL_INFO:
      return {
        ...state,
        journalChanged: true,
        journal: {
          ...state.journal,
          ...action.payload,
        }
      }
    case ACT.SET_JOURNAL_ATTRS:
      return { ...state, attrs: action.payload }
    case ACT.SET_JOURNAL_VIEWS:
      return { ...state, views: action.payload }
    case ACT.SET_JOURNAL_NOTES:
      return { ...state, notes: action.payload }
    default:
      return state
  }
}

export default journalReducer
