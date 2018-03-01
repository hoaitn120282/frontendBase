import { takeLatest, fork } from 'redux-saga/effects';
import getMovie from './get-movie';
import * as Types from './../constants';

export default function* rootSaga() {
    yield fork(takeLatest, Types.MOVIE_FETCH_MOVIE, getMovie);
}
