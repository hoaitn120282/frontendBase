import produce from 'immer';
import * as Types from './constants';

const initState = {
    movieData: []
};
export default (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case Types.MOVIE_FETCH_MOVIE_SUCCESS:
                draft.movieData = action.payload;
                break;
            default:
                break;
        }
    });
