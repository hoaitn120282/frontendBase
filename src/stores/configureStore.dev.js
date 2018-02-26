import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createSagaMonitor } from 'redux-saga-devtools';

import rootReducer from '../reducers';
import rootSaga from './../sagas';
const monitor = createSagaMonitor();

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware({
        sagaMonitor: monitor
    });
    const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware, initialState), reduxDevTools));
    sagaMiddleware.run(rootSaga);
    return store;
}
