import * as Types from './constants';

export const getMovie = name => ({
    type: Types.MOVIE_FETCH_MOVIE,
    name,
    meta: {
        thunk: true
    }
});
