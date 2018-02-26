import { call, put } from 'redux-saga/effects';
import * as Types from './constants';
import * as api from './api';

export function* login({ params, options }) {
    try {
        const response = yield call(api.requestLogin, { params, options });
        yield put({ type: Types.AUTH_REQUEST_LOGIN_SUCCESS, response });
    } catch (error) {
        yield put({ type: Types.AUTH_REQUEST_LOGIN_FAIL, error });
    }
}

export function* me() {
    try {
        const response = yield call(api.me);

        yield put({ type: Types.AUTH_REQUEST_ME, response });
    } catch (error) {
        yield put({ type: Types.AUTH_REQUEST_ME_FAIL, error });
    }
}
