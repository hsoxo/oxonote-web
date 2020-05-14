import {call, fork, put, select, take} from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import {push} from 'connected-react-router'
import sagaAction from "@/store";
import * as GlobalACT from '@/store/global/actions'
import {SAGA_LOAD_JOURNAL_LIST} from '@/store/global/actions'
import * as ACT from './actions'
import {
  SAGA_CREATE_VIEW,
  SAGA_DELETE_VIEW,
  SAGA_JOURNAL_CREATE,
  SAGA_JOURNAL_READ,
  SAGA_UPDATE_ATTR_RANGE,
  SAGA_UPDATE_VIEW_ATTR_SETTING
} from './actions'
import {JournalState} from '@/types/states'
import {AttributeRangeType, JournalViewAttribute} from "@/types/journal";

const SAGA_ACTIONS = Object.entries(ACT).filter(x => x[0].startsWith('SAGA') && typeof x[1] === 'string').map(x => x[1]) as unknown as Array<string>

function* journalSW() {
  while (true) {
    const action: JournalSagaActions = yield take(SAGA_ACTIONS)
    console.log(
      `%c Journal Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case ACT.SAGA_JOURNAL_CREATE: {
        yield fork(createJournal); break;
      }
      case ACT.SAGA_JOURNAL_READ: {
        yield fork(readJournal, action.journalId); break;
      }
      case ACT.SAGA_UPDATE_INFO: {
        yield fork(updateJournalInfo, action.payload); break;
      }
      case ACT.SAGA_UPDATE_ATTR_RANGE: {
        yield fork(journalAttrRangeChange, action.attrId, action.newRange); break;
      }
      case ACT.SAGA_UPDATE_VIEW_ATTR_SETTING: {
        yield fork(updateViewAttrSetting, action.viewId, action.attribute); break;
      }
      case ACT.SAGA_CREATE_VIEW: {
        yield fork(createJournalView, action.viewType, action.viewLabel); break;
      }
      // case ACT.SAGA_UPDATE_VIEW: {
      //   yield fork(updateViewAttrSetting, action.viewId, action.attribute); break;
      // }
      case ACT.SAGA_DELETE_VIEW: {
        yield fork(deleteJournalView, action.viewId); break;
      }
    }
  }
}

function* saveToPouch() {
  try {
    const {
      journalChanged,
      journal
    }: JournalState = yield select(state => state.get('journal'))
    if (journalChanged) {
      const copy = Object.assign({}, journal)
      yield fork(PouchConn.journal.update, copy._id, copy)
    }
  } catch (e) {
    console.log(e)
  }
}

interface JournalCreate {
  type: typeof SAGA_JOURNAL_CREATE
}
function* createJournal() {
  try {
    const journalDoc = yield call(PouchConn.journal.create)
    sagaAction({ type: GlobalACT.SAGA_LOAD_JOURNAL_LIST })
    yield put(push(`/o/journal/${journalDoc._id}`))
  } catch (e) {
    console.error(e)
  }
}

interface JournalRead {
  type: typeof SAGA_JOURNAL_READ
  journalId: string
}
function* readJournal(journalId: string) {
  try {
    const value = yield call(PouchConn.journal.readOne, journalId)
    yield put(ACT.setAllJournalInfo(value))
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}

interface PartialJournalObject {
  title?: string
  titleIcon?: string
  bannerImg?: string
  attrs?: Array<string>
}
type UpdateJournalInfo = { type: typeof ACT.SAGA_UPDATE_INFO, payload: PartialJournalObject }
function* updateJournalInfo(payload: any) {
  try {
    const { journal: { _id } }: JournalState = yield select(state => state.get('journal'))
    yield call(PouchConn.journal.update, _id, payload)
    yield put(ACT.setJournalInfo(payload))
    if ('title' in payload) {
      yield put({type: SAGA_LOAD_JOURNAL_LIST})
    }
  } catch (e) {
    console.error(e)
  }
}

interface JournalAttrRangeChange {
  type: typeof SAGA_UPDATE_ATTR_RANGE
  attrId: string
  newRange: Array<AttributeRangeType>
}
function* journalAttrRangeChange(attrId: string, newRange: Array<AttributeRangeType>) {
  try {
    yield call(PouchConn.journal.attr.update, attrId, 'range', newRange)
    yield call(refreshJournal)
 } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}


interface UpdateViewAttrSetting {
  type: typeof SAGA_UPDATE_VIEW_ATTR_SETTING
  viewId: string
  attribute: Array<JournalViewAttribute>
}
function* updateViewAttrSetting(viewId: string, attribute: Array<JournalViewAttribute>) {
  try {
    yield call(PouchConn.journal.view.update, viewId, 'attribute', attribute)
    yield call(refreshJournal)
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}


interface CreateJournalView {
  type: typeof SAGA_CREATE_VIEW
  viewType: string
  viewLabel: string
}
function* createJournalView(viewType: string, viewLabel: string) {
  try {
    const { journal: { _id } }: JournalState = yield select(state => state.get('journal'))
    yield call(PouchConn.journal.view.create, _id, viewType, viewLabel)
    yield call(refreshJournal)
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}

interface UpdateJournalView {
  type: typeof SAGA_UPDATE_VIEW_ATTR_SETTING
  viewId: string
  attribute: Array<JournalViewAttribute>
}
function* updateJournalView(viewId: string, attribute: Array<JournalViewAttribute>) {
  try {
    yield call(PouchConn.journal.view.update, viewId, 'attribute', attribute)
    yield call(refreshJournal)
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}

interface DeleteJournalView {
  type: typeof SAGA_DELETE_VIEW
  viewId: string
}
function* deleteJournalView(viewId: string) {
  try {
    yield call(PouchConn.journal.view.remove, viewId, )
    yield call(refreshJournal)
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}
export type JournalSagaActions = JournalCreate | JournalRead | UpdateJournalInfo | JournalAttrRangeChange |
  UpdateViewAttrSetting | CreateJournalView | DeleteJournalView

function* refreshJournal() {
  try {
    const { journal: { _id } } = yield select(state => state.get('journal'))
    const value = yield call(PouchConn.journal.readOne, _id)
    yield put(ACT.setAllJournalInfo(value))
  } catch (e) {
    if (e.name === 'not_found') put(push(`/o`))
    console.error(e)
  }
}

export default journalSW
