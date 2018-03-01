import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as Types from './../constants';

const getMovie = name => {
    return axios.get(`https://api.tvmaze.com/search/shows?q=${name}`);
};

export default function*({ name, options, meta }) {
    try {
        const res = yield call(getMovie, name, options);
        yield put({
            type: Types.MOVIE_FETCH_MOVIE_SUCCESS,
            payload: res.data,
            meta
        });
    } catch (error) {
        yield put({
            type: Types.MOVIE_FETCH_MOVIE_ERROR,
            error: true,
            payload: error,
            meta
        });
    }
}
