import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as thunkReducer } from 'redux-saga-thunk';

import { reducers } from './../redux-utils';

const rootReducer = combineReducers({
    ...reducers,
    thunk: thunkReducer,
    router: routerReducer
});
export default rootReducer;
