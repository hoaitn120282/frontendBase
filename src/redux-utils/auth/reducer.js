import * as Types from './constants';

const initState = {
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    userInfo: {},
    permissions: {},
    role: ''
};

export default (state = initState, action) => {
    switch (action.type) {
        case Types.AUTH_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: false
            };
        case Types.AUTH_REQUEST_LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case Types.AUTH_REQUEST_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userInfo: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                permissions: action.payload.user.accountPermissions || {},
                role: action.payload.user.roleName || ''
            };

        case Types.RESET_LOGOUT_REQUEST:
        case Types.AUTH_REQUEST_LOGOUT:
            return { ...state };
        case Types.AUTH_REQUEST_LOGOUT_FAIL:
        case Types.AUTH_REQUEST_LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: {},
                accessToken: '',
                refreshToken: '',
                permissions: {},
                role: ''
            };

        case Types.AUTH_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: false
            };
        case Types.AUTH_REQUEST_ME_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case Types.AUTH_REQUEST_ME_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userInfo: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                permissions: action.payload.user.accountPermissions || {},
                role: action.payload.user.roleName || ''
            };
        case Types.SUCCESS_REQUEST_REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token
            };
        case Types.AUTH_REQUEST_REGISTER:
            return {
                ...state,
                errorRegister: {},
                userRegister: {}
            };
        case Types.AUTH_REQUEST_REGISTER_FAIL:
            return {
                ...state,
                errorRegister: action.payload,
                userRegister: {}
            };
        case Types.AUTH_REQUEST_REGISTER_SUCCESS:
            return {
                ...state,
                errorRegister: {},
                userRegister: action.payload
            };

        default:
            return state;
    }
};
