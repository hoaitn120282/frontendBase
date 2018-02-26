import Request from 'helpers/Request';
import { uploadAPI, uploadUnAuthAPI, assetAPI, assetPropertyAPI, accountAPI, configAPI } from 'constants/apiURL';

export function upload(data = { file: {}, type: 'media' }, params = {}) {
    const { file, type } = data;
    return Request.makeUpload(`${uploadAPI}/${type}`, file, params);
}

export function removeAsset(id, params = {}) {
    return Request.makeDelete(`${assetAPI}/${id}`, params);
}

export function removeAssetProperty(id, params = {}) {
    return Request.makeDelete(`${assetPropertyAPI}/${id}`, params);
}

export function uploadUnAuth(data = { file: {} }, params = {}) {
    const { file } = data;

    return Request.makeUpload(uploadUnAuthAPI, file, params);
}

export function checkEmailExits(params = {}) {
    return Request.makeGet(`${accountAPI}/email-exits`, params);
}

export function getConfig(params) {
    return Request.makeGet(configAPI);
}
