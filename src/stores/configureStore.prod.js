import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootSaga from './../sagas';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, thunk, initialState));
    sagaMiddleware.run(rootSaga);
    return store;
}
