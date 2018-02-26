import { takeLatest } from 'redux-saga/effects';
import * as Types from './constants';
import { login, me } from './sagas';

export function* watcherLogin() {
    yield takeLatest(Types.AUTH_REQUEST_LOGIN, login);
}

export function* watcherMe() {
    yield takeLatest(Types.AUTH_REQUEST_ME, me);
}

export default [watcherLogin(), watcherMe()];
