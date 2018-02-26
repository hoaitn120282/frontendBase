import { call, put } from 'redux-saga/effects';
import * as Types from './../constants';
import Request from 'helpers/Request';
import { configAPI } from 'constants/apiURL';

export function getConfig(params) {
    return Request.makeGet(configAPI);
}

export default function*({ params }) {
    try {
        const res = yield call(getConfig, params);

        yield put({
            type: Types.COMMON_FETCH_CONFIG_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        yield put({ type: Types.COMMON_FETCH_CONFIG_FAIL, error });
    }
}
