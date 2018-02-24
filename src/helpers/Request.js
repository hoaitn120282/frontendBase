/* eslint no-console: 0 */
import axios, { CancelToken } from 'axios';
import _ from 'lodash';
import { actions } from 'redux-utils';

import { BASE_URL } from 'constants/config';

class Request {
    constructor() {
        this.token = '';
        const token = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
        this.onRefreshToken = null;
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            this.token = token;
            Object.assign(headers, {
                Authorization: `Bearer ${this.token}`
            });
        }

        this.axios = axios.create({
            baseURL: BASE_URL,
            timeout: 15000,
            headers,
            responseType: 'json',
            transformResponse: [
                (data, headers) => {
                    if (data) {
                        if (!data.hasOwnProperty('success') || data.success) return data;
                        else {
                            const err = { response: { data } };
                            throw err;
                        }
                    } else {
                        const err = { code: 404, message: 'NotFound' };
                        throw err;
                    }
                }
            ],
            validateStatus: status => {
                if (status === 403) {
                    window.location = `${window.location.origin}/#/403`;
                } else {
                    return status >= 200 && status < 300; // default
                }
            }
        });

        this.axios.interceptors.request.use(
            config => {
                // Do something before request is sent
                return config;
            },
            error => {
                // Do something with request error
                return Promise.reject(error);
            }
        );
    }

    setupInterceptors(store) {
        this.store = store;

        const { authActions } = actions;

        this.axios.interceptors.response.use(
            response => {
                // Do something with response data
                return response;
            },
            error => {
                if (error.response) {
                    const originalRequest = error.config;
                    const errorType = _.get(error.response, 'data.error', '');
                    if (errorType === 'invalid_token') {
                        if (!this.onRefreshToken) {
                            this.onRefreshToken = store.dispatch(authActions.refreshToken(this.refreshToken));
                            return this.onRefreshToken.then(() => {
                                this.onRefreshToken = null;
                                originalRequest.headers.Authorization = `Bearer ${this.token}`;
                                return this.axios.request(originalRequest);
                            });
                        } else {
                            return this.onRefreshToken.then(() => {
                                originalRequest.headers.Authorization = `Bearer ${this.token}`;
                                return this.axios.request(originalRequest);
                            });
                        }
                    } else if (['refresh_token_not_found', 'invalid_grant'].includes(errorType)) {
                        this.clearToken();
                        this.clearRefreshToken();
                        store.dispatch(authActions.logout());
                    } else {
                        return Promise.reject(error.response);
                    }
                } else if (error.request) {
                    return Promise.reject(error.request);
                } else {
                    return Promise.reject(error);
                }
            }
        );
    }

    setToken(token = '') {
        localStorage.setItem('accessToken', token);
        this.token = token;
        this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.axios.defaults.headers.Authorization = `Bearer ${this.token}`;
    }

    clearToken() {
        localStorage.removeItem('accessToken');
        this.token = '';
        delete this.axios.defaults.headers.common.Authorization;
        delete this.axios.defaults.headers.Authorization;
    }

    setRefreshToken(token = '') {
        localStorage.setItem('refreshToken', token);
        this.refreshToken = token;
    }

    clearRefreshToken() {
        localStorage.removeItem('refreshToken');
        this.refreshToken = '';
    }

    _onError = error => {
        if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw error.request;
        } else {
            throw error;
        }
    };

    _mapConfig = config => {
        if (config.ignoreAuth) {
            config.validateStatus = status => {
                return status >= 200 && status < 300; // default
            };
        }
        return config;
    };

    cancelToken() {
        return CancelToken.source();
    }

    makeRequest(config = {}) {
        config = this._mapConfig(config);
        this.axios.request(config).catch(this._onError);
    }

    makePost(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios.post(url, data, config).catch(this._onError);
    }

    makePut(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios.put(url, data, config).catch(this._onError);
    }

    makePatch(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios.patch(url, data, config).catch(this._onError);
    }

    makeGet(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, {
            params
        });
        return this.axios.get(url, config).catch(this._onError);
    }

    makeDelete(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, {
            params
        });
        return this.axios.delete(url, config).catch(this._onError);
    }

    makeUpload(url, file, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        data.append('file', file);
        return this.axios.post(url, data, params).catch(this._onError);
    }

    makeUploadPut(url, file, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        data.append('file', file);
        return this.axios.put(url, data, params).catch(this._onError);
    }

    makeDownload(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, { params }, { responseType: 'blob' });
        return this.axios.get(url, config).catch(this._onError);
    }

    uploadSystemEmail(url, dataPost, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        _.forEach(dataPost, function(value, key) {
            data.append(key, value);
        });

        return this.axios.post(url, data, params).catch(this._onError);
    }
    updateEmailSystem(url, dataPost, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        _.forEach(dataPost, function(value, key) {
            data.append(key, value);
        });

        return this.axios.put(url, data, params).catch(this._onError);
    }
}

export default new Request();
