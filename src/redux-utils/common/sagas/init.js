import { all, call } from 'redux-saga/effects';
import getConfig from './get-config';
import me from 'redux-utils/auth/sagas/me';

export default function*() {
    yield all([call(getConfig, {}), call(me)]);
}
