import { spawn, call, delay, fork } from 'redux-saga/effects'

import noteSaga from './note/saga'

const makeRestartable = (saga: any) => {
    return function* () {
        yield spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    console.error("unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!",saga);
                } catch (e) {
                    console.error("Saga error, the saga will be restarted",e);
                }
                yield delay(1000); // Workaround to avoid infinite error loops
            }
        })
    };
};

const rootSagas = [
    noteSaga
].map(makeRestartable);

export default function* rootSaga() {
    yield call(noteSaga)
}