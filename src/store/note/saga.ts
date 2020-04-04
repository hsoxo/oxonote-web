import {put,take,call,fork,takeEvery,select} from 'redux-saga/effects'
import PouchConn from "@/services/pouchdb";
import { push } from 'connected-react-router'

import * as act from './action-declares'


function* noteSagaWatcher() {
    while (true) {
        const action = yield take(Object.values(act.default))
        console.log(`%c Note Saga: ${action.type}: ${JSON.stringify(action)}`, 'color: #f0c002')
        switch (action.type) {
            case act.default.SAGA_READ_ALL_JOURNALS: {

                break
            }
            case act.default.SAGA_CREATE_JOURNAL: {
                // yield fork(createJournal)
                break
            }
            case act.default.SAGA_READ_JOURNAL: {
                yield fork(readJournal, action.payload)
                break
            }
            case act.default.SAGA_UPDATE_JOURNAL: {
                yield fork(updateJournal, action.payload)
                break
            }
        }
    }
}

function* createJournal() {
    try {
        const value = yield call(PouchConn.journal.create)
        value.notes = []
        yield put({ type: act.SET_CUR_JOURNAL, payload: value})
        yield put(push(`/o/journal/${value._id}`))
    } catch (e) {
        console.error(e)
    }
}

function* readJournal(jourId: string) {
    try {
        const value = yield call(PouchConn.journal.readOne, jourId)
        yield put({ type: act.SET_CUR_JOURNAL, payload: value})
    } catch (e) {
        console.error(e)
    }
}

function* updateJournal(payload: object) {
    try {
        yield put({ type: act.SET_CUR_JOURNAL, payload})
    } catch (e) {
        console.error(e)
    }
}

export default noteSagaWatcher

