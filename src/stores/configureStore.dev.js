import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

// import logger from 'redux-logger';
import rootSaga from './../sagas';
import rootReducer from '../reducers';
// import DevTools from './../containers/DevTools';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(sagaMiddleware, thunk, initialState), reduxDevTools)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
