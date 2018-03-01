import { auth, authActions, authSagas } from './auth';
import { common, commonActions, commonSagas } from './common';
import { movie, movieActions, movieSagas } from './movie';
import { language, languageActions } from './language';

export const reducers = {
    auth,
    common,
    language,
    movie
};

export const actions = {
    authActions,
    commonActions,
    languageActions,
    movieActions
};

export const sagas = { authSagas, commonSagas, movieSagas };
