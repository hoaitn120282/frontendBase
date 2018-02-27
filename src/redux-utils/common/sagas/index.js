import { takeLatest } from 'redux-saga/effects';
import getConfig from './get-config';
import init from './init';
import upload from './upload';
import * as Types from './../constants';

export function* watchUploadConfig() {
    yield takeLatest(Types.COMMON_FETCH_CONFIG, getConfig);
}

export function* watchUpload() {
    yield takeLatest(Types.COMMON_REQUEST_UPLOAD, upload);
}

export function* initSaga() {
    yield takeLatest(Types.COMMON_REQUEST_INIT, init);
}

// export default function* rootSaga() {
//     yield fork(watchUploadConfig);
//     yield fork(watchUpload);
//     yield fork(initSaga);
// }
export default function* rootSaga() {
    yield takeLatest(Types.COMMON_FETCH_CONFIG, getConfig);
    yield takeLatest(Types.COMMON_REQUEST_UPLOAD, upload);
    yield takeLatest(Types.COMMON_REQUEST_INIT, init);
}
