import * as Types from './constants';

const initState = {
    isRefreshToken: false,
    isAuthenticated: false,
    token: '',
    refreshToken: '',
    userInfo: {},
    hasRequestLogin: false,
    hasRequestMe: true,
    errorLogin: {},
    permissions: {},
    accountRoutes: [],
    role: '',
    successLogout: false,
    errorRegister: {},
    userRegister: {}
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.AUTH_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestLogin: true,
                token: '',
                refreshToken: '',
                userInfo: {},
                errorLogin: {},
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.AUTH_REQUEST_LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestLogin: false,
                token: '',
                refreshToken: '',
                userInfo: {},
                errorLogin: action.payLoad,
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.AUTH_REQUEST_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                hasRequestLogin: false,
                userInfo: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                errorLogin: {},
                permissions: action.payload.user.accountPermissions || {},
                accountRoutes: action.payload.user.accountRoutes || [],
                role: action.payload.user.roleName || ''
            };

        case Types.RESET_LOGOUT_REQUEST:
        case Types.AUTH_REQUEST_LOGOUT:
            return { ...state, successLogout: false };
        case Types.AUTH_REQUEST_LOGOUT_FAIL:
        case Types.AUTH_REQUEST_LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: {},
                token: '',
                refreshToken: '',
                permissions: {},
                accountRoutes: [],
                role: '',
                successLogout: true
            };

        case Types.AUTH_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestMe: true,
                token: '',
                refreshToken: '',
                userInfo: {},
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.AUTH_REQUEST_ME_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestMe: false,
                token: '',
                refreshToken: '',
                userInfo: {},
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.AUTH_REQUEST_ME_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                hasRequestMe: false,
                userInfo: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                permissions: action.payload.user.accountPermissions || {},
                accountRoutes: action.payload.user.accountRoutes || [],
                role: action.payload.user.roleName || ''
            };

        case Types.BEFORE_REQUEST_REFRESH_TOKEN:
            return { ...state, isRefreshToken: true };
        case Types.SUCCESS_REQUEST_REFRESH_TOKEN:
            return {
                ...state,
                isRefreshToken: false,
                token: action.payload.access_token,
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
}
