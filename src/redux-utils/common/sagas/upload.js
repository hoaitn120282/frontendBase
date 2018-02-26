import { call, put } from 'redux-saga/effects';
import * as Types from './../constants';
import Request from 'helpers/Request';
import { uploadAPI } from 'constants/apiURL';

export function upload(data = { file: {}, type: 'media' }, params = {}) {
    const { file, type } = data;
    return Request.makeUpload(`${uploadAPI}/${type}`, file, params);
}

export default function*({ params }) {
    try {
        const res = yield call(upload, params);

        yield put({
            type: Types.COMMON_REQUEST_UPLOAD_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        yield put({ type: Types.COMMON_REQUEST_UPLOAD_FAIL, error });
    }
}
