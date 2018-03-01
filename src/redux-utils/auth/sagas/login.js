import { call, put } from 'redux-saga/effects';
import _ from 'lodash';
import Request from 'helpers/Request';
import { authAPI } from 'constants/apiURL';
import * as Types from './../constants';

const requestLogin = (params, options) => {
    const data = Object.assign({ grant_type: 'password' }, params);
    return Request.makePost(authAPI, data);
};

export default function*({ params, options, meta }) {
    try {
        const { data = {} } = yield call(requestLogin, params, options);
        Request.setToken(_.get(data, 'data.access_token'));
        Request.setRefreshToken(_.get(data, 'data.refreshToken'));
        yield put({
            meta,
            type: Types.AUTH_REQUEST_LOGIN_SUCCESS,
            payload: {
                user: data.data,
                accessToken: _.get(data, 'data.access_token'),
                refreshToken: _.get(data, 'data.refreshToken')
            }
        });
    } catch (error) {
        yield put({
            type: Types.AUTH_REQUEST_LOGIN_FAIL,
            error: true,
            payload: error,
            meta
        });
    }
}
