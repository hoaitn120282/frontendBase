import { BASE_URL } from 'constants/config';
import url from 'url';
import queryString from 'query-string';
import _ from 'lodash';

export const generateImageUrl = (link = '') => {
    if (_.isString(link)) return url.resolve(BASE_URL, link);
    return '';
};

export const getIdYoutube = (url = '') => {
    const code = url.match(/v=([^&#]{5,})/);
    if (code) {
        return typeof code[1] === 'string' ? code[1] : '';
    }
};

export const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return 'N/A';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 0);
    if (i === 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

export const parseLocation = (location = {}) => {
    const { search } = location;
    const query = queryString.parse(search);
    return { ...location, query };
};
