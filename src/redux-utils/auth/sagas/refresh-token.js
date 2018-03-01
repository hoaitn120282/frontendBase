import { call, put } from 'redux-saga/effects';
import _ from 'lodash';
import Request from 'helpers/Request';
import { refreshTokenAPI } from 'constants/apiURL';
import * as Types from './../constants';

const refreshToken = (refresh_token = '') => {
    return Request.makePost(refreshTokenAPI, { refresh_token });
};

export default function*({ refresh_token, meta }) {
    try {
        const { data = {} } = yield call(refreshToken, refresh_token);
        Request.setToken(_.get(data, 'data.access_token', ''));
        Request.setRefreshToken(_.get(data, 'data.refreshToken'));
        yield put({
            type: Types.AUTH_REQUEST_REFRESH_TOKEN_SUCCESS,
            payload: data,
            meta
        });
    } catch (error) {
        yield put({
            type: Types.AUTH_REQUEST_REFRESH_TOKEN_FAIL,
            error: true,
            payload: error,
            meta
        });
    }
}
