import * as ACT from './actions'
import { GlobalState } from './type'

const initialState: GlobalState = {
  title: 'Welcome to OxO Notes',
  loggedIn: true,
  token: '',
  user: 'hs',
  journals: []
}

function reducerGlobal(
  state = initialState,
  action: ACT.GlobalActionType
): GlobalState {
  switch (action.type) {
    case ACT.SET_TITLE:
      return { ...state, title: action.payload || 'Welcome to OxO Notes' }
    case ACT.SET_JOURNAL_LIST:
      return { ...state, journals: action.payload }
    default:
      return state
  }
}

export default reducerGlobal