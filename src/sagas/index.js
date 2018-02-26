import { all } from 'redux-saga/effects';
import { sagas } from 'redux-utils';

export default function* rootSaga() {
    yield all([...sagas]);
}
