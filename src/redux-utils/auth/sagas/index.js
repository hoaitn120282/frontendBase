import { takeLatest, fork } from 'redux-saga/effects';
import * as Types from './../constants';
import login from './login';
import me from './me';
import logout from './logout';
import register from './register';

export default function* rootSaga() {
    yield fork(login);
    yield fork(takeLatest, Types.AUTH_REQUEST_ME, me);
    yield fork(takeLatest, Types.AUTH_REQUEST_LOGOUT, logout);
    yield fork(takeLatest, Types.AUTH_REQUEST_REGISTER, register);
}
