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
    successLogout: false
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_LOGIN:
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
        case Types.ERROR_REQUEST_LOGIN:
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
        case Types.SUCCESS_REQUEST_LOGIN:
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
        case Types.BEFORE_REQUEST_LOGOUT:
            return { ...state, successLogout: false };
        case Types.ERROR_REQUEST_LOGOUT:
        case Types.SUCCESS_REQUEST_LOGOUT:
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

        case Types.BEFORE_REQUEST_ME:
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
        case Types.ERROR_REQUEST_ME:
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
        case Types.SUCCESS_REQUEST_ME:
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

        default:
            return state;
    }
}
