import { auth, authActions, authSagas } from './auth';
import { common, commonActions, commonSagas } from './common';
import { language, languageActions } from './language';

export const reducers = {
    auth,
    common,
    language
};

export const actions = {
    authActions,
    commonActions,
    languageActions
};

// export const sagas = [...authSagas, ...commonSagas];
export const sagas = { authSagas, commonSagas };
