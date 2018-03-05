import * as Types from './constants';

const initState = {
    movieData: []
};
export default (state = initState, action) => {
    switch (action.type) {
        case Types.MOVIE_FETCH_MOVIE_SUCCESS:
            return { ...state, movieData: action.payload };
        default:
            return state;
    }
};
