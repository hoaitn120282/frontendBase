import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createSagaMonitor } from 'redux-saga-devtools';

import rootSaga from './../sagas';
import rootReducer from '../reducers';
const monitor = createSagaMonitor();

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware({
        sagaMonitor: monitor
    });
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(sagaMiddleware, thunk, initialState), reduxDevTools)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
