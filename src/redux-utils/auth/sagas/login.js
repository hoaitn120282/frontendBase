import { call, put, take } from 'redux-saga/effects';
import Request from 'helpers/Request';
import { authAPI } from 'constants/apiURL';
import * as Types from './../constants';

const requestLogin = (params, options) => {
    const data = Object.assign({ grant_type: 'password' }, params);
    return Request.makePost(authAPI, data);
};

export default function*() {
    while (true) {
        const { params, options, meta } = yield take(Types.AUTH_REQUEST_LOGIN);
        try {
            const res = yield call(requestLogin, params, options);
            Request.setToken(res.data.data.access_token);
            Request.setRefreshToken(res.data.data.refreshToken);
            yield put.resolve({
                meta,
                type: Types.AUTH_REQUEST_LOGIN_SUCCESS,
                payload: {
                    user: res.data.data,
                    accessToken: res.data.data.access_token,
                    refreshToken: res.data.data.refreshToken
                }
            });
        } catch (error) {
            yield put({ type: Types.AUTH_REQUEST_LOGIN_FAIL, error });
        }
    }
}
