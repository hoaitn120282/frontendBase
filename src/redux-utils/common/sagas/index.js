import { takeLatest } from 'redux-saga/effects';
import getConfig from './get-config';
import upload from './upload';
import * as Types from './../constants';

export function* watchUploadConfig() {
    yield takeLatest(Types.COMMON_FETCH_CONFIG, getConfig);
}

export function* watchUpload() {
    yield takeLatest(Types.COMMON_REQUEST_UPLOAD, upload);
}

export default [watchUploadConfig(), watchUpload()];
