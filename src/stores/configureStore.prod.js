import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';

import rootSaga from '../sagas';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware, initialState));
    sagaMiddleware.run(rootSaga);
    return store;
}
