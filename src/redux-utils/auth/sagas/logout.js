import { call, put } from 'redux-saga/effects';
import Request from 'helpers/Request';
import { logoutAPI } from 'constants/apiURL';
import * as Types from './../constants';

const logout = () => {
    return Request.makeGet(logoutAPI).then(res => {
        Request.clearToken();
        Request.clearRefreshToken();
        return res;
    });
};

export default function*({ params, options, meta }) {
    try {
        const res = yield call(logout);

        yield put({
            type: Types.AUTH_REQUEST_LOGOUT_SUCCESS,
            payload: res.data,
            meta
        });
    } catch (error) {
        yield put({
            type: Types.AUTH_REQUEST_LOGOUT_FAIL,
            error: true,
            payload: error,
            meta
        });
    }
}
