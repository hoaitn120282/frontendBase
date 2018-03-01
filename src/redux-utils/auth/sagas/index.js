import { takeLatest, fork } from 'redux-saga/effects';
import * as Types from './../constants';
import login from './login';
import me from './me';
import logout from './logout';
import register from './register';
import refreshToken from './refresh-token';

export default function* rootSaga() {
    yield fork(takeLatest, Types.AUTH_REQUEST_LOGIN, login);
    yield fork(takeLatest, Types.AUTH_REQUEST_ME, me);
    yield fork(takeLatest, Types.AUTH_REQUEST_LOGOUT, logout);
    yield fork(takeLatest, Types.AUTH_REQUEST_REGISTER, register);
    yield fork(takeLatest, Types.AUTH_REQUEST_REFRESH_TOKEN, refreshToken);
}
