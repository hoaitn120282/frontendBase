import * as Types from './constants';

export function login(params, options) {
    return dispatch => {
        dispatch({
            type: Types.AUTH_REQUEST_LOGIN,
            params,
            options
        });
    };
}

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
