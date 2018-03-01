import { call, put } from 'redux-saga/effects';
import * as Types from './../constants';
import Request from 'helpers/Request';
import { configAPI } from 'constants/apiURL';

const getConfig = (params = {}) => {
    return Request.makeGet(configAPI, params);
};

export default function*({ params, meta }) {
    try {
        const res = yield call(getConfig, params);

        yield put({
            type: Types.COMMON_FETCH_CONFIG_SUCCESS,
            payload: res.data,
            meta
        });
    } catch (error) {
        yield put({
            type: Types.COMMON_FETCH_CONFIG_FAIL,
            error: true,
            payload: error,
            meta
        });
    }
}
