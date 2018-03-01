import { call, put } from 'redux-saga/effects';
import Request from 'helpers/Request';
import { registerAPI } from 'constants/apiURL';
import * as Types from './../constants';

export const registerAction = (params = {}, options = {}) => {
    return Request.makePost(registerAPI, params, options);
};

export default function*({ params, options, meta }) {
    try {
        const res = yield call(registerAction, params, options);
        yield put({
            type: Types.AUTH_REQUEST_REGISTER_SUCCESS,
            payload: res.data,
            meta
        });
    } catch (error) {
        yield put({
            type: Types.AUTH_REQUEST_REGISTER_FAIL,
            error: true,
            payload: error,
            meta
        });
    }
}
