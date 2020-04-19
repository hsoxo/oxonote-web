import { put, take, call, fork, throttle, select } from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import { push } from 'connected-react-router'
import action from "@/store";
import * as GlobalACT from '@/store/global/actions'
import * as ACT from './actions'
import {JournalState} from '@/types/states'
import {AttributeRangeType} from "@/types/journal";
import {SAGA_JOURNAL_CREATE} from "./actions";
import {SAGA_JOURNAL_READ} from "./actions";
import {SAGA_UPDATE_ATTR_RANGE} from "./actions";

export function* journalSaveSW() {
  yield throttle(1000, ACT.SAVE_TO_POUCH, saveToPouch)
}

function* journalSW() {
  while (true) {
    const action: JournalSagaActions = yield take(Object.values(ACT.default))
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
    action({ type: GlobalACT.SAGA_LOAD_JOURNAL_LIST })
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
}
type UpdateJournalInfo = { type: typeof ACT.SAGA_UPDATE_INFO, payload: PartialJournalObject }
function* updateJournalInfo(payload: any) {
  try {
    const { journal: { _id } }: JournalState = yield select(state => state.get('journal'))
    yield call(PouchConn.journal.update, _id, payload)
    yield put(ACT.setJournalInfo(payload))
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
    const value = yield call(PouchConn.journal.attr.update, attrId, 'range', newRange)
    yield put(ACT.setAllJournalInfo(value))
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}

export type JournalSagaActions = JournalCreate | JournalRead | UpdateJournalInfo | JournalAttrRangeChange
export default journalSW
