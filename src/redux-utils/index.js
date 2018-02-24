import { auth, authActions } from './auth';
import { common, commonActions } from './common';
import { register, registerActions } from './register';
import { language, languageActions } from './language';

export const reducers = {
    auth,
    register,
    common,
    language
};

export const actions = {
    authActions,
    registerActions,
    commonActions,
    languageActions
};
