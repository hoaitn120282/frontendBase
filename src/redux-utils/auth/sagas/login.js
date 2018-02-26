import { call, put } from 'redux-saga/effects';
import Request from 'helpers/Request';
import { authAPI } from 'constants/apiURL';
import * as Types from './../constants';

export const requestLogin = (params, options) => {
    const data = Object.assign({ grant_type: 'password' }, params);
    return Request.makePost(authAPI, data).then(res => {
        Request.setToken(res.data.data.access_token);
        Request.setRefreshToken(res.data.data.refreshToken);

        return res;
    });
};

export default function*({ params, options, resolve, reject }) {
    try {
        const res = yield call(requestLogin, params, options);
        yield put({
            type: Types.AUTH_REQUEST_LOGIN_SUCCESS,
            payload: {
                user: res.data.data,
                accessToken: res.data.data.access_token,
                refreshToken: res.data.data.refreshToken
            }
        });
        resolve(res);
    } catch (error) {
        yield put({ type: Types.AUTH_REQUEST_LOGIN_FAIL, error });
        reject(error);
    }
}
