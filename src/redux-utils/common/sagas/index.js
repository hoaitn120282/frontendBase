import { takeLatest, fork } from 'redux-saga/effects';
import getConfig from './get-config';
import upload from './upload';
import * as Types from './../constants';

export default function* rootSaga() {
    yield fork(takeLatest, Types.COMMON_FETCH_CONFIG, getConfig);
    yield fork(takeLatest, Types.COMMON_REQUEST_UPLOAD, upload);
}
