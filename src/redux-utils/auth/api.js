import _ from 'lodash';
import Request from 'helpers/Request';
import { authAPI, meAPI, logoutAPI, refreshTokenAPI } from 'constants/apiURL';

export const requestLogin = (params, options) => {
    const data = Object.assign({ grant_type: 'password' }, params);
    return Request.makePost(authAPI, data).then(res => {
        Request.setToken(res.data.data.access_token);
        Request.setRefreshToken(res.data.data.refreshToken);

        return res;
    });
};

export const logout = () => {
    return Request.makeGet(logoutAPI).then(res => {
        Request.clearToken();
        Request.clearRefreshToken();
        return res;
    });
};

export const me = () => {
    return Request.makeGet(meAPI);
};

export const refreshToken = refresh_token => {
    return Request.makePost(refreshTokenAPI, { refresh_token }).then((res = {}) => {
        const { data = {} } = res;
        Request.setToken(_.get(data, 'data.access_token', ''));
        Request.setRefreshToken(_.get(data, 'data.refresh_token', ''));

        return res;
    });
};
