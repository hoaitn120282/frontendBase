import _ from 'lodash';

export default {
    data: {},
    get(key, def = '') {
        return _.get(this.data, key, def);
    },
    register(key, value) {
        _.set(this.data, key, value);
    }
};
