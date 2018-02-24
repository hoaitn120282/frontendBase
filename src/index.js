import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'moment/locale/zh-cn';
import 'moment/locale/vi';

import configureStore from './stores/configureStore';
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.css';
import 'antd/dist/antd.css';
import './shared/index.global.scss';

import { APP_DOM_CONTAINER } from 'constants/config';
import App from './App';
import ConnectedLocaleProvider from './containers/ConnectedLocaleProvider';
import { history } from './historyConfigure';
import Request from 'helpers/Request';

const middleware = routerMiddleware(history);

const store = configureStore(middleware);

Request.setupInterceptors(store);

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConnectedLocaleProvider>
                <App />
            </ConnectedLocaleProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById(APP_DOM_CONTAINER)
);
registerServiceWorker();
