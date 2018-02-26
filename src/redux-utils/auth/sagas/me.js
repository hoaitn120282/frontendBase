import { call, put } from 'redux-saga/effects';
import Request from 'helpers/Request';
import { meAPI } from 'constants/apiURL';
import * as Types from './../constants';

export const me = () => {
    return Request.makeGet(meAPI);
};

export default function*({ params, options }) {
    try {
        const res = yield call(me);

        yield put({
            type: Types.AUTH_REQUEST_ME_SUCCESS,
            payload: {
                accessToken: Request.token,
                user: res.data,
                refreshToken: res.data.refreshToken
            }
        });
    } catch (error) {
        yield put({ type: Types.AUTH_REQUEST_ME_FAIL, error });
    }
}