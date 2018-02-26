import { all, call, put } from 'redux-saga/effects';
import getConfig from './get-config';
import me from 'redux-utils/auth/sagas/me';
import { COMMON_FETCH_CONFIG_SUCCESS } from './../constants';
import { AUTH_REQUEST_ME_SUCCESS } from 'redux-utils/auth/constants';

export default function*() {
    try {
        const [configData, meData] = yield all([call(getConfig), call(me)]);
        yield [
            put({
                type: COMMON_FETCH_CONFIG_SUCCESS,
                payload: configData.data
            }),
            put({
                type: AUTH_REQUEST_ME_SUCCESS,
                payload: {
                    accessToken: Request.token,
                    user: meData.data,
                    refreshToken: meData.data.refreshToken
                }
            })
        ];
    } catch (error) {
        //
    }
}
