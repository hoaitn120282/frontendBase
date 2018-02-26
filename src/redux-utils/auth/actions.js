import * as Types from './constants';

export const login = (params = {}, options = {}) => ({
    type: Types.AUTH_REQUEST_LOGIN,
    params,
    options
});

export const register = (params, options) => ({
    type: Types.AUTH_REQUEST_REGISTER,
    params,
    options
});

export const logout = () => ({
    type: Types.AUTH_REQUEST_LOGOUT
});

export const resetLogout = () => ({
    type: Types.RESET_LOGOUT_REQUEST
});

export const me = () => ({
    type: Types.AUTH_REQUEST_ME
});

export const refreshToken = refresh_token => ({
    type: Types.AUTH_REQUEST_REFRESH_TOKEN,
    refresh_token
});
