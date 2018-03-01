import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { sagas } from 'redux-utils';
import _ from 'lodash';

export default function* rootSaga() {
    const allSagas = [];

    _.forOwn(sagas, sagaValue => {
        allSagas.push(sagaValue);
    });
    yield all(_.map(allSagas, fork));
}
