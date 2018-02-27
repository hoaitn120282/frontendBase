import * as Types from './constants';

export const init = () => ({
    type: Types.COMMON_REQUEST_INIT
});

export const getConfig = params => ({
    type: Types.COMMON_FETCH_CONFIG
});
