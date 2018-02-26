import { takeLatest } from 'redux-saga/effects';
import * as Types from './../constants';
import login from './login';
import me from './me';
import logout from './logout';

export function* watcherLogin() {
    yield takeLatest(Types.AUTH_REQUEST_LOGIN, login);
}

export function* watcherMe() {
    yield takeLatest(Types.AUTH_REQUEST_ME, me);
}

export function* watcherLogout() {
    yield takeLatest(Types.AUTH_REQUEST_LOGOUT, logout);
}

export default [watcherLogin(), watcherMe(), watcherLogout()];
