import defaultAvatar from 'assets/images/default-avatar.png';
const isProd = process.env.REACT_APP_IWD_ENV === 'production';
const prodApi = 'http://52.62.10.140';
const devApi = 'http://localhost:9000';

const prodSocketURL = 'http://52.62.10.140:8000';
const devSocketURL = 'http://52.77.228.172:3030';

export const APP_DOM_CONTAINER = 'root';

//API URL
export const BASE_URL = isProd ? prodApi : devApi;

// ASSET URL
export const SITE_URL = isProd ? prodApi : devApi;

// Socket URL
export const SOCKET_URL = isProd ? prodSocketURL : devSocketURL;

export const DEFAULT_REDIRECT = '/';

//CLIENT_ID
export const CLIENT_ID = 1;

export const UPLOAD_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export const DEFAULT_AVATAR = defaultAvatar;
export const GOOGLE_MAP_API_KEY = 'AIzaSyDWgwCQGoLetkP-8OFb84Dr_jjI8ogHPj8';
