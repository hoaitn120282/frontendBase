import { fork } from 'redux-saga/effects';
// import { all } from 'redux-saga/effects';
// import { sagas } from 'redux-utils';
// import _ from 'lodash';
import auth from 'redux-utils/auth/sagas';
import common from 'redux-utils/common/sagas';

export default function* rootSaga() {
    yield fork(auth);
    yield fork(common);
    // const allSagas = [];

    // _.forOwn(sagas, sagaValue => {
    //     _.forOwn(sagaValue, saga => {
    //         allSagas.push(fork(saga));
    //     });
    // });
    // yield all([...allSagas]);
}
