import { takeLatest, fork } from 'redux-saga/effects';
import * as Types from './../constants';
import login from './login';
import me from './me';
import logout from './logout';
import register from './register';

export function* watcherLogin() {
    yield takeLatest(Types.AUTH_REQUEST_LOGIN, login);
}

export function* watcherMe() {
    yield takeLatest(Types.AUTH_REQUEST_ME, me);
}

export function* watcherLogout() {
    yield takeLatest(Types.AUTH_REQUEST_LOGOUT, logout);
}

export function* watcherRegister() {
    yield takeLatest(Types.AUTH_REQUEST_REGISTER, register);
}

export default function* rootSaga() {
    yield fork(watcherLogin);
    yield fork(watcherMe);
    yield fork(watcherLogout);
    yield fork(watcherRegister);
}

// export default [watcherLogin, watcherMe, watcherLogout, watcherRegister];
