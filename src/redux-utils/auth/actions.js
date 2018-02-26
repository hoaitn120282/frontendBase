import * as Types from './constants';
// import { bindActionToPromise } from 'helpers/Common';

export const login = (params = {}, options = {}) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: Types.AUTH_REQUEST_LOGIN,
                params,
                options,
                resolve,
                reject
            });
        });
    };
};

export const register = (params, options) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: Types.AUTH_REQUEST_REGISTER,
                params,
                options,
                resolve,
                reject
            });
        });
    };
};

export function logout() {
    return dispatch => {
        dispatch({
            type: Types.AUTH_REQUEST_LOGOUT
        });
    };
}

export function resetLogout() {
    return dispatch => {
        dispatch({
            type: Types.RESET_LOGOUT_REQUEST
        });
    };
}

export function me() {
    return dispatch => {
        dispatch({
            type: Types.AUTH_REQUEST_ME
        });
    };
}

export const refreshToken = refresh_token => {
    return dispatch => {
        dispatch({
            type: Types.AUTH_REQUEST_REFRESH_TOKEN,
            refresh_token
        });
    };
};
